import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { X, Clock, Users, ArrowRight, Sparkles, Calendar } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export default function OfferPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [timeLeft, setTimeLeft] = useState({ hours: 80, minutes: 0, seconds: 0 });
    const { t } = useLanguage();
    const { pathname } = useLocation();

    const targetDate = new Date('2026-04-02T03:24:00').getTime();

    useEffect(() => {
        const hasSeenOffer = sessionStorage.getItem('ivy_offer_seen_v12');
        if (hasSeenOffer) return;

        const isCoursePage = pathname.includes('/cambridge') || 
                             pathname.includes('/ib') || 
                             pathname.includes('/international') || 
                             pathname.includes('/singaporean') || 
                             pathname.includes('/canadian') ||
                             pathname.includes('/indian');

        if (isCoursePage) {
            const showTimer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(showTimer);
        } else {
            const showTimer = setTimeout(() => setIsVisible(true), 30000);
            return () => clearTimeout(showTimer);
        }
    }, [pathname]);

    useEffect(() => {
        if (!isVisible) return;

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                clearInterval(interval);
                return;
            }

            const totalSeconds = Math.floor(distance / 1000);
            const h = Math.floor(totalSeconds / 3600);
            const m = Math.floor((totalSeconds % 3600) / 60);
            const s = totalSeconds % 60;

            setTimeLeft({ hours: h, minutes: m, seconds: s });
        }, 1000);

        return () => clearInterval(interval);
    }, [isVisible, targetDate]);

    const handleClose = () => {
        setIsVisible(false);
        sessionStorage.setItem('ivy_offer_seen_v12', 'true');
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-700"
                onClick={handleClose}
            />

            {/* Flat & Short Popup Container */}
            <div className="relative bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.2)] max-w-4xl w-full animate-in zoom-in-95 fade-in duration-700 overflow-hidden flex flex-col md:flex-row h-auto border border-white/50">
                
                {/* Visual Side (Image) - Covers left side elegantly */}
                <div className="md:w-[38%] relative min-h-[220px] md:min-h-full overflow-hidden bg-slate-50">
                    <img 
                      src="/student-offer.png" 
                      alt="Student" 
                      className="absolute inset-0 w-full h-full object-cover z-10"
                    />
                    {/* Compact Badge */}
                    <div className="absolute top-4 left-4 z-30 bg-white/60 backdrop-blur-md p-1.5 rounded-xl border border-white/40">
                        <img src="/favicon.png" alt="Favicon" className="w-5 h-5 object-contain" />
                    </div>
                </div>

                {/* Content Side (Shortened Spacing) */}
                <div className="md:w-[62%] p-6 md:p-8 lg:p-10 relative z-10 flex flex-col justify-center bg-white">
                    {/* Close Button */}
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 w-8 h-8 bg-slate-50 hover:bg-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all z-40"
                    >
                        <X size={16} />
                    </button>

                    {/* Top Urgency Header (One row for horizontal space optimization) */}
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                        <div className="flex items-center gap-2 bg-slate-900 text-white px-4 py-1.5 rounded-lg text-xs font-black tracking-tighter shadow-md">
                            <Clock size={12} className="text-primary animate-pulse" />
                            <span className="font-mono">{timeLeft.hours}H : {timeLeft.minutes}M : {timeLeft.seconds}S</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-amber-900 bg-amber-50 px-3 py-1.5 rounded-lg text-[9px] font-black border border-amber-100 uppercase tracking-widest">
                            <Users size={11} />
                            <span>FIRST 7 STUDENTS</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-primary bg-blue-50 px-3 py-1.5 rounded-lg text-[9px] font-black border border-blue-100 uppercase tracking-widest">
                            <Calendar size={11} />
                            <span>UNTIL 31 MARCH</span>
                        </div>
                    </div>

                    {/* Elite Header */}
                    <div className="mb-4">
                        <div className="flex items-center gap-1.5 text-primary text-[8px] font-black uppercase tracking-[0.4em] mb-1">
                            <Sparkles size={10} />
                            <span>{t('PREMIUM OFFER')}</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 leading-tight uppercase tracking-tight">
                            AI <span className="text-[#5595D9]">PROMPTING</span> <br />
                            <span className="text-slate-900">CODING & PYTHON</span>
                        </h2>
                    </div>

                    <p className="text-slate-500 font-bold text-xs italic leading-snug mb-6 max-w-sm">
                        {t('Elite 1-on-1 private coaching for the next generation of technologists.')}
                    </p>

                    {/* Compact Pricing Section */}
                    <div className="flex items-center mb-6">
                        <div className="flex flex-col group/price">
                            {/* Bold Red Strike */}
                            <div className="relative w-fit translate-y-2">
                                <span className="text-slate-300 text-xl md:text-2xl font-black italic opacity-60">฿990</span>
                                <div className="absolute top-1/2 left-0 w-full h-[3px] bg-red-600 -rotate-[10deg] translate-y-[-50%]" />
                            </div>
                            
                            <div className="flex items-baseline gap-1">
                                <span className="text-5xl md:text-7xl font-black text-[#5595D9] tracking-tighter leading-none">฿590</span>
                                <span className="text-slate-400 font-bold text-[9px] uppercase tracking-widest">{t('/ session')}</span>
                            </div>
                        </div>
                    </div>

                    {/* Flat Button */}
                    <a
                        href="https://line.me/ti/p/@221vifhp"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group w-full bg-slate-900 hover:bg-[#5595D9] text-white px-6 py-4 rounded-xl font-black text-xs md:text-sm tracking-[0.1em] transition-all duration-300 flex items-center justify-center gap-3 active:scale-[0.98]"
                    >
                        {t('CLAIM YOUR ELITE OFFER NOW')}
                        <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
                    </a>
                </div>
            </div>
        </div>
    );
}
