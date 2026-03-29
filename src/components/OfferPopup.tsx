import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { X, Clock, Users, ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export default function OfferPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [timeLeft, setTimeLeft] = useState({ hours: 80, minutes: 0, seconds: 0 });
    const { t } = useLanguage();
    const { pathname } = useLocation();

    // The offer ends exactly 80 hours after it first appears in the user session
    // Or we can use a fixed date. Let's use a fixed date for consistency across devices for the user to see - say April 2nd, 2026 3:00 AM (approx 80 hours from now)
    const targetDate = new Date('2026-04-02T03:24:00').getTime();

    useEffect(() => {
        const hasSeenOffer = sessionStorage.getItem('ivy_offer_seen_v4');
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

            // Calculate hours, minutes, seconds for an 80-hour countdown
            const totalSeconds = Math.floor(distance / 1000);
            const h = Math.floor(totalSeconds / 3600);
            const m = Math.floor((totalSeconds % 3600) / 60);
            const s = totalSeconds % 60;

            setTimeLeft({
                hours: h,
                minutes: m,
                seconds: s
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isVisible, targetDate]);

    const handleClose = () => {
        setIsVisible(false);
        sessionStorage.setItem('ivy_offer_seen_v4', 'true');
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-navy/70 backdrop-blur-md animate-in fade-in duration-700"
                onClick={handleClose}
            />

            {/* Popup Container */}
            <div className="relative bg-white rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl max-w-4xl w-full animate-in zoom-in-95 fade-in duration-700 overflow-hidden border border-white/20 flex flex-col md:flex-row h-auto md:min-h-[500px]">
                
                {/* Visual Side (Image - Fills Left Side completely) */}
                <div className="md:w-5/12 relative min-h-[300px] md:min-h-full overflow-hidden">
                    {/* Background Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#5595D9]/20 to-primary/30 z-0" />
                    
                    {/* The Image - Absolute and Covering the container */}
                    <img 
                      src="/student-offer.png" 
                      alt="Special Offer" 
                      className="absolute inset-0 w-full h-full object-cover z-10 scale-[1.05] hover:scale-110 transition-transform duration-[10s] ease-linear"
                    />
                    
                    {/* Subtle Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent z-20" />
                </div>

                {/* Content Side */}
                <div className="md:w-7/12 p-8 md:p-14 md:pl-12 relative z-10 flex flex-col justify-center">
                    {/* Close Button */}
                    <button
                        onClick={handleClose}
                        className="absolute top-6 right-6 w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-navy hover:bg-slate-200 transition-all z-40"
                    >
                        <X size={20} />
                    </button>

                    {/* Offer Tag */}
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 w-fit border border-primary/20">
                        <Sparkles size={16} className="animate-pulse" />
                        <span className="text-xs font-black uppercase tracking-widest leading-none">{t('Special Offer!')}</span>
                    </div>

                    <h2 className="text-3xl md:text-5xl lg:text-5xl font-black text-navy mb-4 tracking-tight leading-[1.05] uppercase">
                        AI <span className="text-[#5595D9]">Prompting</span>,<br />
                        <span className="text-primary italic">Coding & Python</span>
                    </h2>
                    
                    <p className="text-slate-500 font-bold text-base md:text-lg mb-8 tracking-wide">
                        {t('Premium 1-on-1 Sessions for Future Technologists')}
                    </p>

                    {/* Pricing Grid */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 mb-10 bg-slate-50/80 p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-inner relative group/offer">
                        <div className="flex flex-col">
                            <div className="flex items-baseline gap-3">
                                <span className="text-slate-400 text-2xl md:text-3xl line-through decoration-red-400/60 font-black italic opacity-60">฿990</span>
                                <span className="text-5xl md:text-7xl font-black text-[#5595D9] drop-shadow-sm transition-transform group-hover/offer:scale-105 duration-300">฿590</span>
                            </div>
                            <span className="text-slate-400 font-black tracking-[0.2em] uppercase text-[10px] md:text-xs mt-1 ml-1">{t('PER SESSION')}</span>
                        </div>

                        {/* Vertical line on desktop */}
                        <div className="hidden sm:block w-px h-16 bg-slate-200 mx-2" />

                        {/* Timer and Slots */}
                        <div className="flex flex-col gap-3 justify-center">
                             {/* The Timer - 80 Hour Countdown */}
                             <div className="flex items-center gap-2.5 text-navy font-black text-sm md:text-base uppercase tracking-tight bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100">
                                <Clock size={16} className="text-primary animate-spin-slow" />
                                <span className="text-primary">{timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s</span>
                                <span className="text-slate-400 font-bold ml-1 text-xs">{t('LEFT')}</span>
                             </div>
                             
                             <div className="bg-[#FFF5EB] text-[#854D0E] px-4 py-2 rounded-xl flex items-center gap-2 border border-[#FDE68A]/30 w-fit">
                                <Users size={14} />
                                <span className="font-black text-[10px] uppercase tracking-widest">{t('LIMITED SLOTS')}</span>
                            </div>
                        </div>
                    </div>

                    <a
                        href="https://line.me/ti/p/@221vifhp"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group w-full bg-navy hover:bg-[#5595D9] text-white px-8 py-6 rounded-2xl font-black text-base md:text-lg transition-all duration-500 flex items-center justify-center gap-3 shadow-2xl hover:shadow-[#5595D9]/40 transform hover:-translate-y-1 active:scale-95 z-30"
                    >
                        {t('BOOK YOUR SESSION VIA LINE TODAY')}
                        <ArrowRight size={22} className="group-hover:translate-x-1.5 transition-transform" />
                    </a>
                </div>
            </div>
        </div>
    );
}
