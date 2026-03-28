import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const languages = [
    {
        code: 'en' as const,
        label: 'English',
        flag: 'https://flagcdn.com/w40/gb.png',
    },
    {
        code: 'th' as const,
        label: 'ไทย',
        flag: 'https://flagcdn.com/w40/th.png',
    },
];

export default function LanguageSelector() {
    const [isOpen, setIsOpen] = useState(false);
    const { language, setLanguage } = useLanguage();
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const changeLanguage = (langCode: 'en' | 'th') => {
        setLanguage(langCode);
        setIsOpen(false);
    };

    const current = languages.find(l => l.code === language) || languages[0];

    return (
        <div ref={dropdownRef} className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all duration-200"
            >
                <img
                    src={current.flag}
                    alt={current.label}
                    className="w-5 h-4 rounded-sm object-cover shadow-sm"
                />
                <span className="text-xs font-bold text-slate-700 hidden sm:inline">{current.label}</span>
                <ChevronDown size={12} className={`text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white border border-slate-100 shadow-2xl rounded-xl p-1.5 w-36 z-[150] animate-in fade-in zoom-in-95 duration-200">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => changeLanguage(lang.code)}
                            className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-bold transition-all ${language === lang.code
                                ? 'bg-primary/5 text-primary'
                                : 'text-slate-600 hover:bg-slate-50'
                                }`}
                        >
                            <img
                                src={lang.flag}
                                alt={lang.label}
                                className="w-5 h-4 rounded-sm object-cover shadow-sm"
                            />
                            {lang.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
