import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { X, Clock, Users, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export default function OfferPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const { t } = useLanguage();
    const { pathname } = useLocation();

    // Target date for the offer
    const targetDate = new Date('2026-04-30T23:59:59').getTime();

    useEffect(() => {
        const hasSeenOffer = sessionStorage.getItem('ivy_offer_seen_v2');
        if (hasSeenOffer) return;

        // Check if we are on a course/curriculum page
        const isCoursePage = pathname.includes('/cambridge') || 
                             pathname.includes('/ib') || 
                             pathname.includes('/international') || 
                             pathname.includes('/singaporean') || 
                             pathname.includes('/canadian') ||
                             pathname.includes('/indian');

        if (isCoursePage) {
            // Trigger almost immediately on course pages (1.5s delay for smooth entrance)
            const showTimer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(showTimer);
        } else {
            // Fallback: Show after 30 seconds of exploration on other pages (e.g. Home)
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
        // We set session storage so it doesn't pop up again in the same session
        sessionStorage.setItem('ivy_offer_seen_v2', 'true');
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-navy/40 backdrop-blur-md animate-in fade-in duration-700"
                onClick={handleClose}
            />

            {/* Popup */}
            <div className="relative bg-white rounded-[2rem] xs:rounded-[3rem] shadow-2xl max-w-2xl w-full p-6 xs:p-10 sm:p-12 animate-in zoom-in-95 fade-in duration-700 overflow-hidden border border-white/20">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none" />

                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-6 right-6 w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-navy hover:bg-slate-200 transition-all z-20"
                >
                    <X size={20} />
                </button>

                {/* Content */}
                <div className="relative z-10 text-center flex flex-col items-center">
                    {/* Small tag at top */}
                    <div className="w-24 h-5 bg-[#5595D9]/30 rounded-full mb-8" />

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-navy mb-6 tracking-tight uppercase">
                        UNLOCK <span className="text-[#5595D9]">ELITE</span> LEARNING
                    </h2>

                    <div className="flex flex-col md:flex-row items-center gap-6 mb-10 w-full justify-center">
                        {/* Price Block */}
                        <div className="flex flex-col items-start md:items-center">
                           <div className="flex items-baseline gap-2">
                                <span className="text-5xl sm:text-7xl font-black text-[#5595D9]">800 Baht</span>
                           </div>
                           <span className="text-slate-400 font-bold tracking-[0.2em] uppercase text-xs md:text-sm mt-1">PER HOUR</span>
                        </div>

                        {/* Divider Line on Desktop */}
                        <div className="hidden md:block w-px h-16 bg-slate-100 mx-4" />

                        {/* Badges Block */}
                        <div className="flex flex-col gap-3">
                            {/* Countdown/Valid Until */}
                            <div className="bg-navy text-white px-5 py-3 rounded-2xl flex items-center gap-3 shadow-lg shadow-navy/20 min-w-[200px]">
                                <Clock size={18} className="text-primary animate-pulse" />
                                <div className="flex flex-col items-start">
                                    <span className="text-[10px] font-black uppercase tracking-wider text-primary/80">VALID UNTIL APRIL 30</span>
                                    <div className="flex gap-1 font-mono text-sm font-bold">
                                        <span>{timeLeft.days}d</span>
                                        <span>{timeLeft.hours}h</span>
                                        <span>{timeLeft.minutes}m</span>
                                        <span className="text-primary w-8">{timeLeft.seconds}s</span>
                                    </div>
                                </div>
                            </div>

                            {/* Limited Slots */}
                            <div className="bg-[#FFF5EB] text-[#854D0E] px-5 py-3 rounded-2xl flex items-center gap-3 border border-[#FDE68A]/30">
                                <Users size={18} />
                                <span className="font-black text-xs uppercase tracking-widest leading-none">LIMITED SLOTS</span>
                            </div>
                        </div>
                    </div>

                    <p className="text-slate-600 text-lg md:text-xl font-medium mb-10 max-w-lg leading-relaxed">
                        {t('Experience elite 1-on-1 private tutoring with our expert educators.')}
                    </p>

                    {/* CTA Button */}
                    <a
                        href="https://line.me/ti/p/@221vifhp"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group w-full bg-[#5595D9]/20 hover:bg-[#5595D9] text-[#5595D9] hover:text-white px-8 py-5 rounded-[1.5rem] font-black text-sm md:text-base transition-all duration-500 flex items-center justify-center gap-3 shadow-xl hover:shadow-primary/40 border border-[#5595D9]/30"
                    >
                        {t('BOOK YOUR FREE DEMO SESSION VIA LINE OFFICIAL TODAY')}
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </div>
        </div>
    );
}
