import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ChevronRight, ChevronDown, GraduationCap, Zap, Sparkles } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '@/i18n/LanguageContext';



import { useSiteSettings } from '@/hooks/useSiteSettings';

export default function Header() {
  const { settings } = useSiteSettings();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMobileAccordion, setOpenMobileAccordion] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const finalNavItems = settings?.header?.navItems || [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    {
      label: 'Cambridge Courses',
      path: '/cambridge',
      subItems: [
        { label: 'Cambridge IGCSE', path: '/cambridge/igcse' },
        { label: 'Cambridge O Level', path: '/cambridge/o-level' },
        { label: 'Cambridge AS Level', path: '/cambridge/as-level' },
        { label: 'Cambridge A Level', path: '/cambridge/a-level' }
      ]
    },
    {
      label: 'IB Programs',
      path: '/ib',
      subItems: [
        { label: 'IB PYP', path: '/ib/primary-years' },
        { label: 'IB MYP', path: '/ib/middle-years' },
        { label: 'IB DP', path: '/ib/diploma' }
      ]
    },
    {
      label: 'International',
      path: '/international',
      subItems: [
        { label: 'Indian (CBSE)', path: '/international/indian' },
        { label: 'Canadian Curriculum', path: '/international/canadian' },
        { label: 'Singaporean Curriculum', path: '/international/singaporean' }
      ]
    },
    { label: 'Contact', path: '/contact' },
  ];

  const welcomeNote = settings?.header?.welcomeNote || "Bangkok's Premier Online Tutoring — Elite 1-on-1 Mastery 🇹🇭";
  const supportPhone = settings?.header?.supportPhone || "";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenMobileAccordion(null);
  }, [location.pathname]);

  return (
    <>
      <header
        className={`fixed w-full top-0 z-[100] transition-transform duration-500 ease-out font-inter ${scrolled ? '-translate-y-8 sm:-translate-y-9' : 'translate-y-0'}`}
      >
        {/* Welcome Note Line */}
        <div className="bg-primary text-white h-8 sm:h-9 px-4 flex items-center justify-center text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">
          {t(welcomeNote)}
        </div>

        <div className="mx-auto max-w-full px-0 mt-0">
          <div
            className={`relative flex items-center justify-between transition-colors duration-500 ease-in-out px-4 sm:px-6 lg:px-8 xl:px-14 py-2 sm:py-5 ${scrolled
              ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200'
              : 'bg-white border-b border-slate-100'
              }`}
          >
            {/* Logo Section */}
            <Link to="/" className="flex-shrink-0 flex items-center group relative z-[20]">
              <img
                src="/logo.png"
                alt="Ivy Bridge"
                className="transition-transform duration-300 ease-in-out w-auto object-contain h-10 lg:h-12 group-hover:scale-105"
                width="160"
                height="48"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex flex-1 justify-center items-center gap-0.5 xl:gap-1.5 z-[10]">
              {finalNavItems.map((item: any) => (
                <div key={item.path} className="relative group/nav">
                  <Link
                    to={item.path}
                    className={`relative px-1.5 lg:px-2 xl:px-2.5 py-2 text-[13px] xl:text-[14px] font-bold transition-all duration-300 rounded-xl flex items-center gap-1.5 ${location.pathname.startsWith(item.path) && item.path !== '/'
                      ? 'text-primary'
                      : 'text-slate-700 hover:text-slate-900 shadow-sm sm:shadow-none'
                      }`}
                  >
                    <span className="relative z-10">{t(item.label)}</span>
                    {item.subItems && <ChevronDown size={14} className="relative z-10 opacity-50 group-hover/nav:opacity-100 transition-opacity" />}
                    <span className="absolute inset-0 bg-primary/5 rounded-xl opacity-0 group-hover/nav:opacity-100 transition-all duration-300 scale-95 group-hover/nav:scale-100" />
                  </Link>

                  {/* Dropdown Menu */}
                  {item.subItems && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-300 translate-y-2 group-hover/nav:translate-y-0 z-50">
                      <div className="bg-white border border-slate-100 shadow-2xl rounded-[1.5rem] p-3 w-64">
                        {item.subItems.map((sub: any) => (
                          <Link
                            key={sub.path}
                            to={sub.path}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 text-sm font-bold text-slate-700 hover:text-primary transition-all"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-primary" />
                            {t(sub.label)}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2 xl:gap-3 relative z-[20]">
              <a 
                href="tel:+66926322458" 
                className="hidden xl:flex items-center gap-2 px-2 xl:px-4 py-2 text-slate-700 hover:text-primary transition-colors font-bold text-[13px] xl:text-[14px] whitespace-nowrap"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Phone size={14} />
                </div>
                +66 92 632 2458
              </a>
              <div className="scale-95 xl:scale-100 origin-right">
                <LanguageSelector />
              </div>
              <Link
                to="/contact"
                className={`hidden sm:flex items-center gap-2 px-4 xl:px-6 py-2.5 rounded-xl font-bold text-[13px] xl:text-[14px] transition-all duration-300 active:scale-95 group bg-slate-900 text-white hover:bg-primary shadow-sm whitespace-nowrap`}
              >
                {t('Book a Demo')}
                <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform shrink-0" />
              </Link>

              {/* Mobile Menu Icon */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle mobile menu icon"
                className={`lg:hidden relative w-10 h-10 flex items-center justify-center rounded-xl overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-900'
                  }`}
              >
                <div className="relative w-5 h-5">
                  <span className={`absolute left-0 w-5 h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'top-2.5 rotate-45' : 'top-1'}`} />
                  <span className={`absolute left-0 w-3 h-0.5 bg-current transition-all duration-300 top-2.5 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                  <span className={`absolute left-0 h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'top-2.5 -rotate-45 w-5' : 'top-4 w-4'}`} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Modern Mobile Menu */}
      <div
        className={`fixed inset-0 z-[110] lg:hidden transition-all duration-500 ease-in-out ${mobileMenuOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
          }`}
      >
        {/* Animated backdrop */}
        <div
          className={`absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-all duration-700 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'
            }`}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Sliding Menu Panel */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-[85dvh] flex flex-col bg-white rounded-t-[2.5rem] shadow-2xl transition-all duration-500 ease-out transform ${mobileMenuOpen ? 'translate-y-0' : 'translate-y-full'
            }`}
        >
          <div className="p-6 md:p-8 pb-12 overflow-y-auto flex-1 min-h-0">
            {/* Grab handle */}
            <div className="w-12 h-1.5 bg-slate-100 rounded-full mx-auto mb-8" />

            <div className="space-y-3">
              <p className="text-[10px] font-black tracking-[0.4em] text-slate-300 uppercase mb-6 ml-4">{t('Navigation')}</p>
              {finalNavItems.map((item: any) => (
                <div key={item.path} className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Link
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex-1 group flex items-center justify-between py-5 px-4 md:px-8 rounded-2xl text-xl font-black transition-all duration-300 ${
                        location.pathname === item.path
                          ? 'bg-primary text-white shadow-xl shadow-primary/20'
                          : 'text-slate-800 hover:bg-slate-50'
                      }`}
                    >
                      <span className="flex items-center gap-4">
                        {t(item.label)}
                        {location.pathname === item.path && <Sparkles size={16} className="text-white animate-pulse" />}
                      </span>
                      {!item.subItems && <ChevronRight size={20} className={location.pathname === item.path ? 'opacity-100' : 'opacity-20'} />}
                    </Link>
                    
                    {item.subItems && (
                      <button
                        onClick={() => setOpenMobileAccordion(openMobileAccordion === item.path ? null : item.path)}
                        className={`w-14 h-[68px] flex items-center justify-center rounded-2xl transition-all duration-300 ${
                          openMobileAccordion === item.path ? 'bg-primary/5 text-primary' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                        }`}
                      >
                        <ChevronDown
                          size={24}
                          className={`transition-transform duration-300 ${
                            openMobileAccordion === item.path ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {item.subItems && (
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out px-4 md:px-8 space-y-1 ${
                        openMobileAccordion === item.path ? 'max-h-[800px] opacity-100 mt-2 mb-4' : 'max-h-0 opacity-0'
                      }`}
                    >
                      {item.subItems.map((sub: any) => (
                        <Link
                          key={sub.path}
                          to={sub.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-3 py-4 px-6 rounded-xl bg-slate-50 text-slate-500 font-bold text-sm hover:text-primary transition-all"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                          {t(sub.label)}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-12 space-y-4">
              <div className="bg-slate-900 rounded-3xl p-5 md:p-8 text-white relative overflow-hidden group">
                {/* Background glow */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary rounded-full blur-[80px] opacity-50 group-hover:opacity-100 transition-opacity duration-700" />

                <h4 className="text-2xl font-black mb-2 relative z-10">{t('Start Your Journey')}</h4>
                <p className="text-slate-400 text-sm mb-8 leading-relaxed relative z-10">{t('Expert 1-on-1 tutoring tailored to your curriculum.')}</p>

                <div className="flex flex-col gap-3 relative z-10">
                  <a href={settings?.footer?.socialLinks?.line || '#'} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group/item">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden shrink-0 shadow-sm group-hover/item:shadow-md transition-all bg-white">
                      <img src="/line-logo.png" alt="LINE Official" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t('Connect with us')}</p>
                      <p className="text-lg font-black group-hover:text-[#06C755]/70 transition-colors">LINE Official</p>
                    </div>
                  </a>
                </div>
              </div>

              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-3 bg-primary text-white py-6 rounded-[2rem] font-black text-xl shadow-2xl transition-all hover:bg-primary/90 active:scale-[0.98]"
              >
                {t('Book a Demo')} <Zap size={22} className="fill-white" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
