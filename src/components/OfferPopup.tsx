import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { X, Clock, Users, ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export default function OfferPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const { t } = useLanguage();
    const { pathname } = useLocation();

    // Target date for the offer: March 31, 2026
    const targetDate = new Date('2026-03-31T23:59:59').getTime();

    useEffect(() => {
        const hasSeenOffer = sessionStorage.getItem('ivy_offer_seen_v3');
        if (hasSeenOffer) return;

        // Check if we are on a course/curriculum page or if 30s have passed
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

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isVisible, targetDate]);

    const handleClose = () => {
        setIsVisible(false);
        sessionStorage.setItem('ivy_offer_seen_v3', 'true');
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-navy/60 backdrop-blur-md animate-in fade-in duration-700"
                onClick={handleClose}
            />

            {/* Popup */}
            <div className="relative bg-white rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl max-w-4xl w-full animate-in zoom-in-95 fade-in duration-700 overflow-hidden border border-white/20 flex flex-col md:flex-row">
                
                {/* Visual Side (Image) */}
                <div className="md:w-5/12 bg-gradient-to-br from-[#5595D9]/10 to-primary/20 relative overflow-hidden flex items-end justify-center pt-12 md:pt-0">
                    <div className="absolute top-12 left-12 w-48 h-48 bg-primary/20 rounded-full blur-3xl" />
                    <img 
                      src="/student-offer.png" 
                      alt="Special Offer Student" 
                      className="relative z-10 w-[80%] md:w-[90%] h-auto object-contain drop-shadow-2xl"
                    />
                </div>

                {/* Content Side */}
                <div className="md:w-7/12 p-8 md:p-14 relative z-10 flex flex-col justify-center">
                    {/* Close Button */}
                    <button
                        onClick={handleClose}
                        className="absolute top-6 right-6 w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-navy hover:bg-slate-200 transition-all z-20"
                    >
                        <X size={20} />
                    </button>

                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 w-fit">
                        <Sparkles size={16} className="animate-pulse" />
                        <span className="text-xs font-black uppercase tracking-widest">{t('Special Offer!')}</span>
                    </div>

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-navy mb-4 tracking-tight leading-none uppercase">
                        AI <span className="text-[#5595D9]">Prompting</span>,<br />
                        <span className="text-primary italic">Coding & Python</span>
                    </h2>
                    
                    <p className="text-slate-500 font-bold text-sm md:text-lg mb-8 tracking-wide">
                        {t('Premium 1-on-1 Sessions for Future Technologists')}
                    </p>

                    <div className="flex flex-wrap items-center gap-6 mb-10 bg-slate-50/80 p-6 rounded-3xl border border-slate-100 shadow-inner">
                        <div className="flex flex-col">
                            <div className="flex items-baseline gap-3">
                                <span className="text-slate-400 text-2xl md:text-3xl line-through decoration-red-400 font-bold italic">฿990</span>
                                <span className="text-4xl md:text-6xl font-black text-[#5595D9]">฿590</span>
                            </div>
                            <span className="text-slate-400 font-black tracking-[0.2em] uppercase text-[10px] md:text-xs">PER SESSION</span>
                        </div>

                        <div className="h-12 w-px bg-slate-200 hidden sm:block" />

                        <div className="flex flex-col gap-2">
                             <div className="flex items-center gap-2 text-navy font-black text-sm uppercase tracking-tighter">
                                <Clock size={16} className="text-primary" />
                                <span>{timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s</span>
                             </div>
                             <div className="bg-[#FFF5EB] text-[#854D0E] px-4 py-1.5 rounded-full flex items-center gap-2 border border-[#FDE68A]/30 w-fit">
                                <Users size={14} />
                                <span className="font-black text-[10px] uppercase tracking-widest">LIMITED SLOTS</span>
                            </div>
                        </div>
                    </div>

                    <a
                        href="https://line.me/ti/p/@221vifhp"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group w-full bg-navy hover:bg-primary text-white px-8 py-5 rounded-2xl font-black text-sm md:text-base transition-all duration-500 flex items-center justify-center gap-3 shadow-xl hover:shadow-primary/30"
                    >
                        {t('BOOK YOUR SESSION VIA LINE TODAY')}
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </div>
        </div>
    );
}
