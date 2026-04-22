"use client";
import Link from 'next/link';
import { Phone, MapPin, Mail, Instagram, Facebook, MessageCircle, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useSiteSettings } from '@/hooks/useSiteSettings';

export default function Footer() {
  const { settings } = useSiteSettings();
  const { t } = useLanguage();

  const quickLinks = settings?.footer?.quickLinks || [
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ];

  const socialLinks = settings?.footer?.socialLinks || {
    facebook: 'https://www.facebook.com/profile.php?id=61583682646298',
    instagram: '#',
    line: 'https://line.me/ti/p/@221vifhp',
    whatsapp: 'https://wa.me/66926322458'
  };

  return (
    <footer className="relative bg-white pt-12 pb-6 overflow-hidden border-t border-slate-50">
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 blur-[140px] rounded-full -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-400/10 blur-[120px] rounded-full translate-y-1/2 pointer-events-none" />

      <div className="max-w-screen-2xl mx-auto px-6 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">

          {/* Brand & Socials */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
            <Link href="/" className="mb-2 inline-block group">
              <div className="relative">
                <img src="/logo.png" alt="Ivy Bridge Logo" className="h-[90px] w-auto object-contain transition-all duration-700 ease-out group-hover:scale-105" width="220" height="90" />
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 group-hover:w-1/2 h-0.5 bg-gradient-to-r from-primary to-blue-400 transition-all duration-700" />
              </div>
            </Link>


            <div className="flex flex-col space-y-4">
              <h4 className="text-navy font-black text-lg tracking-tight uppercase relative inline-block text-center lg:text-left">
                {t('Get in Touch')}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 w-8 h-0.5 bg-primary/30 rounded-full" />
              </h4>
            </div>

            <div className="flex items-center gap-4">
              {[
                { 
                  icon: (props: any) => (
                    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  ), 
                  href: socialLinks.facebook, color: 'bg-[#1877F2] text-white', hover: 'hover:bg-[#1464d8]' 
                },
                { 
                  icon: (props: any) => (
                    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
                      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126s1.336 1.079 2.126 1.384c.766.296 1.636.499 2.913.558C8.333 23.984 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384s1.079-1.335 1.384-2.126c.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126s-1.335-1.079-2.126-1.384c-.765-.296-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.584-.071 4.85c-.055 1.17-.249 1.805-.415 2.227-.217.562-.477.96-.896 1.382-.42.419-.819.679-1.381.896-.422.164-1.056.36-2.227.413-1.266.057-1.646.07-4.85.07s-3.584-.015-4.85-.071c-1.17-.055-1.805-.249-2.227-.415-.562-.217-.96-.477-1.382-.896-.419-.42-.679-.819-.896-1.381-.164-.422-.36-1.057-.413-2.227-.057-1.266-.07-1.646-.07-4.85s.015-3.584.071-4.85c.055-1.17.249-1.805.415-2.227.217-.562.477-.96.896-1.382.42-.419.819-.679 1.381-.896.422-.164 1.057-.36 2.227-.413 1.266-.057 1.646-.07 4.85-.07zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  ), 
                  href: socialLinks.instagram, color: 'bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white', hover: 'hover:opacity-90' 
                },
                { 
                  icon: (props: any) => (
                    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  ), 
                  href: socialLinks.whatsapp, color: 'bg-[#25D366] text-white', hover: 'hover:bg-[#128C7E]' 
                },
                { 
                  icon: (props: any) => (
                    <img src="/line-logo.png" alt="LINE" className="w-full h-full object-cover" />
                  ), 
                  href: socialLinks.line, color: 'bg-transparent overflow-hidden', hover: 'hover:scale-110' 
                }
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg hover:shadow-primary/20 hover:-translate-y-1.5 ${social.color} ${social.hover}`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

          </div>



          {/* Navigation Sections */}
          <div className="lg:col-span-8 grid grid-cols-2 gap-8">
            <div className="flex flex-col space-y-4">
              <h4 className="text-navy font-black text-lg tracking-tight uppercase relative inline-block">
                {t('Explore')}
                <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-primary/30 rounded-full" />
              </h4>
              <ul className="space-y-2">
                {quickLinks.map((link: any) => (
                  <li key={link.path}>
                    <Link href={link.path || "#"} className="text-slate-500 hover:text-primary font-bold text-base flex items-center gap-2 group transition-all">
                      <ArrowRight size={14} className="text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      {t(link.label)}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/faq" className="text-slate-500 hover:text-primary font-bold text-base flex items-center gap-2 group transition-all">
                    <ArrowRight size={14} className="text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    {t('FAQ')}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col space-y-4">
              <h4 className="text-navy font-black text-lg tracking-tight uppercase relative inline-block">
                {t('Curriculums')}
                <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-primary/30 rounded-full" />
              </h4>
              <ul className="space-y-2">
                {[
                  { label: 'Cambridge', path: '/cambridge' },
                  { label: 'IB Programs', path: '/ib' },
                  { label: 'International', path: '/international' }
                ].map((item) => (
                  <li key={item.path}>
                    <Link href={item.path || "#"} className="text-slate-500 hover:text-primary font-bold text-base flex items-center gap-2 group transition-all">
                      <ArrowRight size={14} className="text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      {t(item.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>



        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-6 border-t border-slate-50 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 order-2 md:order-1">
              <p className="text-slate-400 font-bold text-sm">
                &copy; {new Date().getFullYear()} <span className="text-navy font-black tracking-widest uppercase underline decoration-primary/30 underline-offset-4">Ivy Bridge.</span>
              </p>
              <div className="h-1 w-1 bg-slate-200 rounded-full hidden md:block" />
              <p className="text-slate-400 font-bold text-sm italic">{t('Excellence in Global Education')}</p>
              <div className="h-1 w-1 bg-slate-200 rounded-full hidden md:block" />
              <a
                href="https://orbyza.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 transition-all duration-300"
              >
                <span className="text-slate-500 font-bold text-[10px] uppercase tracking-wider">Designed by</span>
                <span className="text-slate-900 font-black text-[11px] tracking-tight group-hover:underline underline-offset-4 uppercase hover:text-primary">Orbyza Digital Marketing Agency</span>
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 order-1 md:order-2">
              <div className="flex items-center gap-2 group mr-4">
                <MapPin size={16} className="text-primary group-hover:scale-110 transition-transform" />
                <p className="text-slate-800 font-extrabold text-sm leading-tight transition-colors">{t('Bangkok, Thailand')}</p>
              </div>
              <Link href="/privacy-policy" className="text-slate-400 hover:text-primary font-black text-[10px] uppercase tracking-[0.2em] transition-all">{t('Privacy Policy')}</Link>
              <Link href="/terms" className="text-slate-400 hover:text-primary font-black text-[10px] uppercase tracking-[0.2em] transition-all">{t('Terms')}</Link>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}



