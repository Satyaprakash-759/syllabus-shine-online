import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import CambridgePage from "./pages/CambridgePage";

const IBPage = lazy(() => import("./pages/IBPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const InternationalPage = lazy(() => import("./pages/InternationalPage"));

const CambridgeIGCSEPage = lazy(() => import("./pages/CambridgeIGCSEPage"));
const CambridgeOLevelPage = lazy(() => import("./pages/CambridgeOLevelPage"));
const CambridgeASLevelPage = lazy(() => import("./pages/CambridgeASLevelPage"));
const CambridgeALevelPage = lazy(() => import("./pages/CambridgeALevelPage"));
const IBPYPPage = lazy(() => import("./pages/IBPYPPage"));
const IBMYPPage = lazy(() => import("./pages/IBMYPPage"));
const IBDPPage = lazy(() => import("./pages/IBDPPage"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const IndianCurriculumPage = lazy(() => import("./pages/IndianCurriculumPage"));
const CanadianCurriculumPage = lazy(() => import("./pages/CanadianCurriculumPage"));
const SingaporeanCurriculumPage = lazy(() => import("./pages/SingaporeanCurriculumPage"));
const FAQPage = lazy(() => import("./pages/FAQPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const DynamicPage = lazy(() => import("./pages/DynamicPage"));

const queryClient = new QueryClient();

// Loading Fallback
const PageLoader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
    <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
  </div>
);

const App = () => (
  <LanguageProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/cambridge" element={<CambridgePage />} />
              <Route path="/cambridge/igcse" element={<CambridgeIGCSEPage />} />
              <Route path="/cambridge/o-level" element={<CambridgeOLevelPage />} />
              <Route path="/cambridge/as-level" element={<CambridgeASLevelPage />} />
              <Route path="/cambridge/a-level" element={<CambridgeALevelPage />} />
              <Route path="/ib" element={<IBPage />} />
              <Route path="/ib/primary-years" element={<IBPYPPage />} />
              <Route path="/ib/middle-years" element={<IBMYPPage />} />
              <Route path="/ib/diploma" element={<IBDPPage />} />
              <Route path="/international" element={<InternationalPage />} />
              <Route path="/international/indian" element={<IndianCurriculumPage />} />
              <Route path="/international/canadian" element={<CanadianCurriculumPage />} />
              <Route path="/international/singaporean" element={<SingaporeanCurriculumPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/p/:slug" element={<DynamicPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </LanguageProvider>
);

export default App;
