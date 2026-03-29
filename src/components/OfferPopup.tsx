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
        const hasSeenOffer = sessionStorage.getItem('ivy_offer_seen_v11');
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
        sessionStorage.setItem('ivy_offer_seen_v11', 'true');
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-700"
                onClick={handleClose}
            />

            {/* Compact Popup Container */}
            <div className="relative bg-white rounded-[2rem] md:rounded-[3.5rem] shadow-[0_45px_120px_-25px_rgba(0,0,0,0.5)] max-w-3xl w-full animate-in zoom-in-95 fade-in duration-700 overflow-hidden flex flex-col md:flex-row h-auto border border-white/50">
                
                {/* Visual Side (Image Column) */}
                <div className="md:w-[40%] relative min-h-[300px] md:min-h-full overflow-hidden bg-slate-100">
                    <img 
                      src="/student-offer.png" 
                      alt="Special Offer" 
                      className="absolute inset-0 w-full h-full object-cover z-10"
                    />
                    {/* Ivy Badge Branding */}
                    <div className="absolute top-5 left-5 z-30 bg-white/40 backdrop-blur-md p-2 rounded-2xl border border-white/50 shadow-sm flex items-center justify-center">
                        <img src="/favicon.png" alt="Favicon" className="w-7 h-7 object-contain" />
                    </div>
                </div>

                {/* Content Side */}
                <div className="md:w-[60%] p-8 md:p-11 lg:p-12 relative z-10 flex flex-col justify-center bg-white">
                    {/* Close Button */}
                    <button
                        onClick={handleClose}
                        className="absolute top-6 right-6 w-10 h-10 bg-slate-50 hover:bg-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all z-40"
                    >
                        <X size={20} />
                    </button>

                    {/* Urgency Section with Timer, Slots, and Validity Date */}
                    <div className="flex flex-col gap-3 mb-8">
                        <div className="flex items-center gap-3 bg-slate-900 text-white px-5 py-2.5 rounded-2xl w-fit shadow-xl shadow-slate-900/10">
                            <Clock size={16} className="text-primary animate-pulse" />
                            <div className="font-mono text-sm md:text-lg font-black flex gap-1.5 uppercase tracking-tighter">
                                <span>{timeLeft.hours}H</span>
                                <span className="opacity-30">:</span>
                                <span>{timeLeft.minutes}M</span>
                                <span className="opacity-30">:</span>
                                <span className="text-primary">{timeLeft.seconds}S</span>
                            </div>
                        </div>
                        
                        <div className="flex flex-col gap-2.5 ml-1">
                             {/* Slots tag */}
                             <div className="flex items-center gap-2 text-[#854D0E] font-black text-[10px] tracking-[0.2em] bg-amber-50 px-4 py-2 rounded-full w-fit border border-amber-100 shadow-sm">
                                <Users size={14} />
                                <span className="leading-none">{t('FIRST 7 STUDENTS ONLY')}</span>
                             </div>
                             
                             {/* Validity tag as requested */}
                             <div className="flex items-center gap-2 text-primary font-black text-[10px] tracking-[0.2em] bg-blue-50 px-4 py-2 rounded-full w-fit border border-blue-100 shadow-sm">
                                <Calendar size={14} />
                                <span className="leading-none">VALID UNTIL 31 MARCH 2026</span>
                             </div>
                        </div>
                    </div>

                    {/* Elite Heading Area */}
                    <div className="space-y-4 mb-8">
                        <div className="flex items-center gap-2 text-primary font-black text-[8px] uppercase tracking-[0.4em] opacity-80">
                            <Sparkles size={11} />
                            <span>{t('PREMIUM SPECIAL OFFER')}</span>
                        </div>
                        
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-[1.05] uppercase tracking-tight">
                            AI <span className="text-[#5595D9]">PROMPTING</span> <br />
                            <span className="text-slate-900">CODING & PYTHON</span>
                        </h2>
                        
                        <div className="h-1.5 w-24 bg-[#5595D9] rounded-full" />
                    </div>

                    <p className="text-slate-500 font-bold text-sm md:text-base italic leading-relaxed mb-8">
                        "{t('World-class 1-on-1 private elite coaching for technologists.')}"
                    </p>

                    {/* Highly Impactful Pricing Section */}
                    <div className="flex items-center mb-12">
                        <div className="flex flex-col group/price">
                            {/* Strike-through 990 enlarged with red bold stroke */}
                            <div className="relative w-fit">
                                <span className="text-slate-400 text-3xl md:text-4xl font-black italic opacity-40 group-hover/price:scale-105 transition-transform">฿990</span>
                                <div className="absolute top-1/2 left-0 w-full h-[3px] bg-red-600 -rotate-[12deg] translate-y-[-40%]" />
                            </div>
                            
                            <div className="flex items-baseline gap-2">
                                <span className="text-6xl md:text-8xl font-black text-[#5595D9] leading-none tracking-tighter drop-shadow-sm transition-transform hover:scale-[1.02] duration-500">฿590</span>
                                <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest leading-none translate-y-[-4px]">{t('/ session')}</span>
                            </div>
                        </div>
                    </div>

                    {/* Elite CTA */}
                    <a
                        href="https://line.me/ti/p/@221vifhp"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group w-full bg-slate-900 hover:bg-[#5595D9] text-white px-8 py-6 rounded-2xl font-black text-sm md:text-base tracking-[0.1em] transition-all duration-500 flex items-center justify-center gap-4 shadow-2xl active:scale-[0.98] transform hover:-translate-y-1"
                    >
                        {t('CLAIM YOUR ELITE OFFER NOW')}
                        <ArrowRight size={22} className="group-hover:translate-x-1.5 transition-transform" />
                    </a>
                    
                    <p className="mt-5 text-center text-slate-300 text-[10px] font-black uppercase tracking-[0.5em] opacity-80">
                        {t('SECURED VIA LINE')}
                    </p>
                </div>
            </div>
        </div>
    );
}
