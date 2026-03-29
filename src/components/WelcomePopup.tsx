import { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const quotes = [
    { text: "Education is the passport to the future, for tomorrow belongs to those who prepare for it today.", author: "Malcolm X" },
    { text: "The beautiful thing about learning is that no one can take it away from you.", author: "B.B. King" },
    { text: "An investment in knowledge pays the best interest.", author: "Benjamin Franklin" },
    { text: "The mind is not a vessel to be filled, but a fire to be kindled.", author: "Plutarch" },
    { text: "Education is not the learning of facts, but the training of the mind to think.", author: "Albert Einstein" },
];

export default function WelcomePopup() {
    const [isVisible, setIsVisible] = useState(false);
    const { t, language, setLanguage } = useLanguage();

    useEffect(() => {
        const hasSeenPopup = sessionStorage.getItem('ivy_welcome_seen_v2');
        if (!hasSeenPopup) {
            const timer = setTimeout(() => setIsVisible(true), 2000); // 2s delay
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        sessionStorage.setItem('ivy_welcome_seen_v2', 'true');
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-navy/60 backdrop-blur-sm animate-in fade-in duration-500"
                onClick={handleClose}
            />

            {/* Popup */}
            <div className="relative bg-white rounded-[1.5rem] xs:rounded-[2.5rem] shadow-2xl max-w-md w-full p-5 xs:p-8 sm:p-10 animate-in zoom-in-95 fade-in duration-500 overflow-hidden">
                {/* Decorative glow */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-[60px]" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary/20 rounded-full blur-[60px]" />

                {/* Close button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 xs:top-6 right-4 xs:right-6 w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-200 transition-all z-10"
                >
                    <X size={16} />
                </button>

                {/* Content */}
                <div className="relative z-10 text-center">
                    {/* Logo */}
                    <div className="flex justify-center mb-6">
                        <img
                            src="/logo.png"
                            alt="Ivy Bridge Logo"
                            className="h-16 w-auto object-contain"
                        />
                    </div>

                    <h2 className="text-2xl font-black text-navy mb-8">
                        {t('Welcome to')} <span className="text-primary">Ivy Bridge</span>
                    </h2>

                    {/* Language Selection */}
                    <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100">
                        <p className="text-slate-500 text-[11px] font-black uppercase tracking-[0.2em] mb-4">
                            {t('Choose Your Language')}
                        </p>
                        <div className="flex gap-3 justify-center">
                            <button
                                onClick={() => {
                                    setLanguage('en');
                                    setTimeout(handleClose, 200);
                                }}
                                className={`flex items-center gap-3 px-5 py-3 rounded-xl border-2 transition-all duration-300 flex-1 justify-center ${language === 'en'
                                    ? 'border-primary bg-primary/5 text-primary scale-105 shadow-md shadow-primary/10'
                                    : 'border-slate-100 bg-white text-slate-600 hover:border-primary/30'
                                    }`}
                            >
                                <img src="https://flagcdn.com/w40/gb.png" alt="English" className="w-5 h-3.5 rounded-sm shadow-sm" />
                                <span className="font-extrabold text-sm">English</span>
                            </button>
                            <button
                                onClick={() => {
                                    setLanguage('th');
                                    setTimeout(handleClose, 200);
                                }}
                                className={`flex items-center gap-3 px-5 py-3 rounded-xl border-2 transition-all duration-300 flex-1 justify-center ${language === 'th'
                                    ? 'border-primary bg-primary/5 text-primary scale-105 shadow-md shadow-primary/10'
                                    : 'border-slate-100 bg-white text-slate-600 hover:border-primary/30'
                                    }`}
                            >
                                <img src="https://flagcdn.com/w40/th.png" alt="Thai" className="w-5 h-3.5 rounded-sm shadow-sm" />
                                <span className="font-extrabold text-sm">ไทย</span>
                            </button>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
}
