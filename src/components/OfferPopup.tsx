import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { X, Clock, Users, ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export default function OfferPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [timeLeft, setTimeLeft] = useState({ hours: 80, minutes: 0, seconds: 0 });
    const { t } = useLanguage();
    const { pathname } = useLocation();

    const targetDate = new Date('2026-04-02T03:24:00').getTime();

    useEffect(() => {
        const hasSeenOffer = sessionStorage.getItem('ivy_offer_seen_v8');
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
        sessionStorage.setItem('ivy_offer_seen_v8', 'true');
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-700"
                onClick={handleClose}
            />

            {/* Popup Container */}
            <div className="relative bg-white rounded-[2rem] md:rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] max-w-4xl w-full animate-in zoom-in-95 fade-in duration-700 overflow-hidden flex flex-col md:flex-row h-auto md:min-h-[500px] border border-white/50">
                
                {/* Visual Side (Image) */}
                <div className="md:w-[42%] relative min-h-[350px] md:min-h-full overflow-hidden bg-slate-50">
                    <img 
                      src="/student-offer.png" 
                      alt="Student" 
                      className="absolute inset-0 w-full h-full object-cover z-10"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-20" />
                </div>

                {/* Content Side */}
                <div className="md:w-[58%] p-8 md:p-12 lg:p-14 relative z-10 flex flex-col justify-center bg-white">
                    {/* Close Button */}
                    <button
                        onClick={handleClose}
                        className="absolute top-6 right-6 w-10 h-10 bg-slate-50 hover:bg-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all z-40"
                    >
                        <X size={20} />
                    </button>

                    {/* Timer Area (Requested by red arrow previously: Slots BELOW Time) */}
                    <div className="flex flex-col gap-2.5 mb-8">
                        {/* THE TIMER */}
                        <div className="flex items-center gap-3 bg-slate-900 text-white px-5 py-2.5 rounded-[1.2rem] w-fit shadow-xl shadow-slate-900/10">
                            <Clock size={16} className="text-primary animate-pulse" />
                            <div className="font-mono text-sm md:text-lg font-black flex gap-1.5 uppercase tracking-tighter">
                                <span>{timeLeft.hours}H</span>
                                <span className="opacity-30">:</span>
                                <span>{timeLeft.minutes}M</span>
                                <span className="opacity-30">:</span>
                                <span className="text-primary">{timeLeft.seconds}S</span>
                            </div>
                        </div>
                        
                        {/* LIMITED SLOTS (NOW BELOW TIME AS REQUESTED) */}
                        <div className="flex items-center gap-2 text-[#854D0E] font-black text-[10px] tracking-[0.2em] bg-amber-50 px-4 py-2 rounded-full w-fit border border-amber-100 ml-1">
                             <Users size={14} />
                             <span>ONLY 3 SLOTS LEFT!</span>
                        </div>
                    </div>

                    {/* Elite Heading (Prominent Course Names) */}
                    <div className="space-y-4 mb-8">
                        <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.3em]">
                            <Sparkles size={14} />
                            <span>{t('PREMIUM SPECIAL OFFER')}</span>
                        </div>
                        
                        <h2 className="text-4xl md:text-5xl lg:text-5xl font-black text-slate-900 leading-[1.05] uppercase tracking-tight">
                            AI <span className="text-[#5595D9]">PROMPTING</span> <br />
                            <span className="text-slate-900">CODING & PYTHON</span>
                        </h2>
                        
                        <div className="h-1.5 w-24 bg-[#5595D9] rounded-full" />
                        
                        <p className="text-slate-500 font-bold text-base md:text-lg italic leading-relaxed">
                            "{t('Expert 1-on-1 sessions for the digital future.')}"
                        </p>
                    </div>

                    {/* Aesthetic Pricing */}
                    <div className="flex items-center gap-8 mb-10">
                        <div className="flex flex-col">
                            <span className="text-slate-300 text-2xl font-black italic line-through mb-1 translate-y-1 opacity-60">฿990</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-6xl md:text-8xl font-black text-[#5595D9] leading-none tracking-tighter drop-shadow-sm">฿590</span>
                                <span className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em]">{t('/ session')}</span>
                            </div>
                        </div>
                    </div>

                    {/* Action Button */}
                    <a
                        href="https://line.me/ti/p/@221vifhp"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group w-full bg-slate-900 hover:bg-[#5595D9] text-white px-8 py-6 rounded-2xl font-black text-sm md:text-base tracking-[0.1em] transition-all duration-500 flex items-center justify-center gap-3 shadow-2xl hover:shadow-[#5595D9]/40 active:scale-[0.98]"
                    >
                        {t('CLAIM YOUR ELITE OFFER NOW')}
                        <ArrowRight size={22} className="group-hover:translate-x-1.5 transition-transform" />
                    </a>
                    
                    <p className="mt-5 text-center text-slate-300 text-[10px] font-black uppercase tracking-[0.5em] opacity-80">
                        {t('SECURED VIA LINE OFFICIAL')}
                    </p>
                </div>
            </div>
        </div>
    );
}
