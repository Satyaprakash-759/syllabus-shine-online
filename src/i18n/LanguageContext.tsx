"use client";
import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { thTranslations } from './th';

type Language = 'en' | 'th';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (text: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
    language: 'en',
    setLanguage: () => { },
    t: (text: string) => text,
});

// Runtime cache for API-translated strings (persisted to localStorage)
const runtimeCache: Record<string, string> = {};

// Load cached translations from localStorage
function loadCache(): void {
    try {
        const cached = localStorage.getItem('ivy_translations_cache');
        if (cached) {
            const parsed = JSON.parse(cached);
            Object.assign(runtimeCache, parsed);
        }
    } catch (e) {
        // Ignore parse errors
    }
}

// Save cache to localStorage
function saveCache(): void {
    try {
        localStorage.setItem('ivy_translations_cache', JSON.stringify(runtimeCache));
    } catch (e) {
        // Ignore storage errors
    }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>(() => {
        try {
            return (localStorage.getItem('ivy_language') as Language) || 'en';
        } catch {
            return 'en';
        }
    });

    // Force re-render when async translations arrive
    const [, setForceUpdate] = useState(0);
    const triggerUpdate = useCallback(() => setForceUpdate(c => c + 1), []);

    useEffect(() => {
        loadCache();
    }, []);

    const setLanguage = useCallback((lang: Language) => {
        setLanguageState(lang);
        try {
            localStorage.setItem('ivy_language', lang);
        } catch {
            // Ignore
        }
    }, []);

    const t = useCallback((text: string): string => {
        if (language === 'en') return text;

        // 1. Check the pre-built dictionary
        if (thTranslations[text]) return thTranslations[text];

        // 2. Check runtime cache (from previous API calls)
        if (runtimeCache[text]) return runtimeCache[text];

        // 3. Queue for async translation (won't block rendering)
        fetchTranslation(text, triggerUpdate);

        // 4. Return English as immediate fallback
        return text;
    }, [language, triggerUpdate]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

// Async translation fetcher (non-blocking)
const pendingTranslations = new Set<string>();

async function fetchTranslation(text: string, onSuccess?: () => void) {
    if (pendingTranslations.has(text)) return;
    pendingTranslations.add(text);

    try {
        const res = await fetch('/api/translate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, target: 'th' }),
        });

        if (res.ok) {
            const data = await res.json();
            if (data.translatedText) {
                runtimeCache[text] = data.translatedText;
                saveCache();
                onSuccess?.();
            }
        }
    } catch (e) {
        // Translation API unavailable — English fallback remains
    } finally {
        pendingTranslations.delete(text);
    }
}

export function useLanguage() {
    return useContext(LanguageContext);
}

