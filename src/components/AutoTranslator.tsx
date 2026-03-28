// =============================================================
// AutoTranslator — Automatic DOM-based page translation engine
// =============================================================
// When language is set to Thai, this component:
// 1. Walks the entire DOM and finds all English text nodes
// 2. Sends them in batches to /api/translate (Vercel serverless)
// 3. Replaces text in the DOM with Thai translations
// 4. Caches everything in localStorage for instant future loads
// 5. Uses MutationObserver to auto-translate new/dynamic content
// 6. Reverts cleanly when switching back to English
//
// NO manual t() wrapping or dictionary required for any page!
// =============================================================

import { useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { thTranslations } from '@/i18n/th';

const CACHE_KEY = 'ivy_auto_translate_v4';
const ORIG_ATTR = 'data-orig';
const ORIG_PH_ATTR = 'data-orig-ph';
const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'SVG', 'CODE', 'PRE', 'LINK', 'META']);

// ---- Persistent translation cache ----
let tCache: Record<string, string> = {};

function loadCache() {
    try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (raw) tCache = JSON.parse(raw);
    } catch { /* ignore */ }
    // Pre-populate with the manual Thai dictionary so those strings are instant
    Object.entries(thTranslations).forEach(([en, th]) => {
        if (!tCache[en]) tCache[en] = th;
    });
}
loadCache();

function saveCache() {
    try { localStorage.setItem(CACHE_KEY, JSON.stringify(tCache)); } catch { /* ignore */ }
}

// ---- Helpers ----
function isTranslatable(text: string): boolean {
    const t = text.trim();
    if (t.length < 2) return false;
    if (!/[a-zA-Z]{2,}/.test(t)) return false;                         // must have English letters
    const thai = (t.match(/[\u0E00-\u0E7F]/g) || []).length;
    if (thai > t.length * 0.4) return false;                            // already mostly Thai
    return true;
}

// ---- API call (batch) ----
async function apiBatchTranslate(texts: string[]): Promise<void> {
    const uncached = texts.filter(t => !tCache[t]);
    if (uncached.length === 0) return;

    // Split into chunks of 25 to avoid huge payloads
    for (let i = 0; i < uncached.length; i += 25) {
        const batch = uncached.slice(i, i + 25);
        try {
            const res = await fetch('/api/translate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ texts: batch, target: 'th' }),
            });
            if (res.ok) {
                const data = await res.json();
                if (data.translations) {
                    Object.entries(data.translations).forEach(([en, th]) => {
                        tCache[en] = th as string;
                    });
                }
            }
        } catch { /* API unavailable — keep English fallback */ }

        // Small delay between batches to be polite
        if (i + 25 < uncached.length) await new Promise(r => setTimeout(r, 120));
    }
    saveCache();
}

// ---- Collect all translatable text nodes ----
function collectTextNodes(): { node: Text; text: string }[] {
    const results: { node: Text; text: string }[] = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
            const el = node.parentElement;
            if (!el) return NodeFilter.FILTER_REJECT;
            if (SKIP_TAGS.has(el.tagName)) return NodeFilter.FILTER_REJECT;
            if (el.closest('script,style,svg,code,pre,[data-no-translate]')) return NodeFilter.FILTER_REJECT;
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') return NodeFilter.FILTER_REJECT;
            if (el.getAttribute(ORIG_ATTR)) return NodeFilter.FILTER_REJECT;      // already translated
            const text = node.textContent?.trim() || '';
            if (!isTranslatable(text)) return NodeFilter.FILTER_REJECT;
            return NodeFilter.FILTER_ACCEPT;
        },
    });
    let n: Node | null;
    while ((n = walker.nextNode())) results.push({ node: n as Text, text: (n.textContent || '').trim() });
    return results;
}

// ================================================================
// Component
// ================================================================
export default function AutoTranslator() {
    const { language } = useLanguage();
    const selfMutating = useRef(false);
    const timer = useRef<ReturnType<typeof setTimeout>>();
    const observer = useRef<MutationObserver>();
    const busy = useRef(false);

    // ---- Translate the page ----
    const translatePage = useCallback(async () => {
        if (language !== 'th' || busy.current) return;
        busy.current = true;

        try {
            const nodes = collectTextNodes();
            if (nodes.length === 0) return;

            // Batch-translate all unique texts
            const unique = [...new Set(nodes.map(n => n.text))];
            await apiBatchTranslate(unique);

            // Apply translations to the DOM
            selfMutating.current = true;
            nodes.forEach(({ node, text }) => {
                const translated = tCache[text];
                if (!translated || !node.parentNode) return;
                const el = node.parentElement!;
                if (!el.getAttribute(ORIG_ATTR)) el.setAttribute(ORIG_ATTR, node.textContent!);
                const orig = node.textContent!;
                const lead = orig.match(/^\s*/)?.[0] ?? '';
                const trail = orig.match(/\s*$/)?.[0] ?? '';
                node.textContent = lead + translated + trail;
            });
            requestAnimationFrame(() => { selfMutating.current = false; });

            // Also translate placeholders
            translatePlaceholders();
        } finally {
            busy.current = false;
        }
    }, [language]);

    // ---- Translate input placeholders ----
    const translatePlaceholders = useCallback(async () => {
        const els = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
            'input[placeholder], textarea[placeholder]'
        );
        const toTranslate: string[] = [];
        els.forEach(el => {
            if (el.getAttribute(ORIG_PH_ATTR)) return;
            const ph = el.placeholder.trim();
            if (isTranslatable(ph) && !tCache[ph]) toTranslate.push(ph);
        });
        if (toTranslate.length > 0) await apiBatchTranslate(toTranslate);

        els.forEach(el => {
            if (el.getAttribute(ORIG_PH_ATTR)) return;
            const ph = el.placeholder.trim();
            if (tCache[ph]) {
                el.setAttribute(ORIG_PH_ATTR, el.placeholder);
                el.placeholder = tCache[ph];
            }
        });
    }, []);

    // ---- Revert to English ----
    const revertPage = useCallback(() => {
        selfMutating.current = true;
        // Restore text nodes
        document.querySelectorAll(`[${ORIG_ATTR}]`).forEach(el => {
            const orig = el.getAttribute(ORIG_ATTR)!;
            const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
            const textNode = walker.nextNode();
            if (textNode) textNode.textContent = orig;
            el.removeAttribute(ORIG_ATTR);
        });
        // Restore placeholders
        document.querySelectorAll(`[${ORIG_PH_ATTR}]`).forEach(el => {
            (el as HTMLInputElement).placeholder = el.getAttribute(ORIG_PH_ATTR)!;
            el.removeAttribute(ORIG_PH_ATTR);
        });
        requestAnimationFrame(() => { selfMutating.current = false; });
    }, []);

    // ---- Effect: watch language changes ----
    useEffect(() => {
        if (language === 'th') {
            // Translate after React finishes rendering
            timer.current = setTimeout(translatePage, 300);

            // Watch for new DOM content (React re-renders, route changes)
            observer.current = new MutationObserver(() => {
                if (selfMutating.current) return;
                clearTimeout(timer.current);
                timer.current = setTimeout(translatePage, 400);
            });
            observer.current.observe(document.body, { childList: true, subtree: true });

            return () => {
                clearTimeout(timer.current);
                observer.current?.disconnect();
            };
        } else {
            revertPage();
        }
    }, [language, translatePage, revertPage]);

    return null; // renders nothing — pure side-effect component
}
