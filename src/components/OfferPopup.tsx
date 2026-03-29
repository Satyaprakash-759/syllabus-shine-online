import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { X, Clock, Users, ArrowRight, Sparkles, Terminal, Cpu } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export default function OfferPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [timeLeft, setTimeLeft] = useState({ hours: 80, minutes: 0, seconds: 0 });
    const { t } = useLanguage();
    const { pathname } = useLocation();

    const targetDate = new Date('2026-04-02T03:24:00').getTime();

    useEffect(() => {
        const hasSeenOffer = sessionStorage.getItem('ivy_offer_seen_v5');
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
        sessionStorage.setItem('ivy_offer_seen_v5', 'true');
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            {/* Backdrop with strong blur */}
            <div
                className="absolute inset-0 bg-navy/80 backdrop-blur-lg animate-in fade-in duration-700"
                onClick={handleClose}
            />

            {/* Popup Container */}
            <div className="relative bg-white rounded-[2.5rem] md:rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] max-w-5xl w-full animate-in zoom-in-95 fade-in duration-700 overflow-hidden flex flex-col md:flex-row h-auto md:min-h-[550px] border border-white/40">
                
                {/* Visual Side (Image Column) */}
                <div className="md:w-[45%] relative min-h-[350px] md:min-h-full overflow-hidden bg-slate-100">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#5595D9]/40 via-primary/20 to-navy/40 z-0" />
                    
                    {/* The Image */}
                    <img 
                      src="/student-offer.png" 
                      alt="Special Offer" 
                      className="absolute inset-0 w-full h-full object-cover z-10 scale-[1.02] transform hover:scale-105 transition-all duration-1000"
                    />
                    
                    {/* Artistic Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent z-20" />
                    <div className="absolute top-8 left-8 z-30 flex flex-col gap-2">
                         <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/30 flex items-center gap-2">
                             <Cpu size={16} className="text-white" />
                             <span className="text-white font-black text-[10px] tracking-widest uppercase">Elite Tech</span>
                         </div>
                    </div>
                </div>

                {/* Content Side */}
                <div className="md:w-[55%] p-8 md:p-14 lg:p-16 relative z-10 flex flex-col justify-center bg-white">
                    {/* Close Button */}
                    <button
                        onClick={handleClose}
                        className="absolute top-8 right-8 w-12 h-12 bg-slate-50 hover:bg-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-navy transition-all z-40 shadow-sm border border-slate-100"
                    >
                        <X size={24} />
                    </button>

                    {/* Top Urgency Header (Timer Moved Here as requested by red arrow) */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-10 w-full">
                        <div className="inline-flex items-center gap-3 bg-primary/10 text-primary px-5 py-2.5 rounded-full border border-primary/20 shadow-sm">
                            <Sparkles size={18} className="animate-pulse" />
                            <span className="text-xs font-black uppercase tracking-[0.2em] leading-none">{t('Limited Time Opportunity')}</span>
                        </div>

                        {/* High Urgency Timer (Moved to top area) */}
                        <div className="flex items-center gap-3 bg-navy text-white px-5 py-2.5 rounded-2xl shadow-xl shadow-navy/20 animate-pulse-slow">
                            <Clock size={16} className="text-primary" />
                            <div className="font-mono text-sm md:text-base font-black flex gap-1">
                                <span>{timeLeft.hours}H</span>
                                <span className="opacity-40">:</span>
                                <span>{timeLeft.minutes}M</span>
                                <span className="opacity-40">:</span>
                                <span className="text-primary">{timeLeft.seconds}S</span>
                            </div>
                        </div>
                    </div>

                    {/* Elite Heading */}
                    <div className="space-y-4 mb-8">
                        <h2 className="text-4xl md:text-6xl font-black text-navy tracking-tight leading-[0.95] uppercase">
                            MASTER THE <br />
                            <span className="text-[#5595D9] relative inline-block">
                                FUTURE
                                <div className="absolute -bottom-2 left-0 w-full h-1.5 bg-primary/20 rounded-full" />
                            </span>
                        </h2>
                        
                        <div className="flex items-center gap-4 text-slate-400">
                             <div className="h-px w-8 bg-slate-200" />
                             <p className="font-bold text-sm md:text-base tracking-[0.1em] text-slate-500 uppercase">
                                AI Prompting • Coding • Python
                             </p>
                        </div>
                    </div>

                    <p className="text-slate-600 text-lg md:text-xl font-medium leading-relaxed mb-10 max-w-md italic">
                        "{t('Join the next generation of technologists with world-class 1-on-1 elite coaching.')}"
                    </p>

                    {/* Pricing Display */}
                    <div className="group relative bg-slate-50/50 rounded-[2.5rem] p-8 md:p-10 mb-12 border border-slate-100 shadow-inner overflow-hidden transition-all hover:bg-white hover:shadow-2xl hover:shadow-primary/5">
                        {/* Subtle background icon */}
                        <Terminal size={120} className="absolute -right-8 -bottom-8 text-slate-200/40 transform -rotate-12 pointer-events-none" />
                        
                        <div className="relative z-10 flex flex-col sm:flex-row items-baseline sm:items-center gap-6">
                            <div className="flex flex-col">
                                <span className="text-slate-300 text-2xl md:text-3xl line-through decoration-primary/50 font-black italic mb-1 translate-y-1">฿990</span>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-6xl md:text-8xl font-black text-[#5595D9] tracking-tighter drop-shadow-sm">฿590</span>
                                    <span className="text-slate-400 font-bold text-sm ml-2">{t('/ session')}</span>
                                </div>
                            </div>
                            
                            <div className="sm:ml-auto flex items-center gap-3 bg-[#FFF5EB] text-[#854D0E] px-5 py-3 rounded-2xl border border-[#FDE68A]/50 shadow-sm">
                                <Users size={20} className="animate-bounce-slow" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black uppercase tracking-widest">{t('ONLY')} 3</span>
                                    <span className="text-[10px] font-black uppercase tracking-widest leading-none">{t('SLOTS LEFT')}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Final WOW CTA */}
                    <a
                        href="https://line.me/ti/p/@221vifhp"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group w-full relative overflow-hidden bg-navy hover:bg-primary text-white px-8 py-7 rounded-[2.5rem] font-black text-lg md:text-xl transition-all duration-700 flex items-center justify-center gap-4 shadow-2xl hover:shadow-primary/40 transform hover:-translate-y-2 active:scale-95 z-30"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        {t('CLAIM YOUR ELITE OFFER NOW')}
                        <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform duration-500" />
                    </a>
                    
                    <p className="mt-6 text-center text-slate-400 text-xs font-bold uppercase tracking-[0.3em]">
                        {t('Secured via LINE Official')}
                    </p>
                </div>
            </div>
        </div>
    );
}
