import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Phone } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import WelcomePopup from './WelcomePopup';
import OfferPopup from './OfferPopup';
import AutoTranslator from './AutoTranslator';
import { useSiteSettings } from '@/hooks/useSiteSettings';


export default function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const { settings } = useSiteSettings();

  const phone = settings?.header?.supportPhone || '';
  const lineUrl = settings?.footer?.socialLinks?.line || 'https://line.me/ti/p/@221vifhp';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col relative font-sans overflow-x-hidden max-w-[100vw]">
      <Header />
      <main className="flex-1 pt-[88px] md:pt-[125px]">{children}</main>
      <Footer />
      <WelcomePopup />
      <OfferPopup />
      <AutoTranslator />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-50">
        <a
          href={lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-[60px] h-[60px] rounded-2xl flex items-center justify-center shadow-[0_10px_30px_rgba(6,199,85,0.4)] transition-all duration-300 hover:scale-110 active:scale-95 group overflow-hidden"
          aria-label="LINE"
        >
          <img src="/line-logo.png" alt="LINE Official" className="w-full h-full object-cover" />
        </a>
      </div>
    </div>
  );
}

