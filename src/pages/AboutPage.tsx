import { Target, Eye, Rocket, Heart, GraduationCap, Users, Sparkles, Globe, ChevronRight, Clock } from 'lucide-react';
import Layout from '@/components/Layout';
import { usePageData } from '@/hooks/usePageData';
import { MetaSEO } from '@/components/MetaSEO';
import { useLanguage } from '@/i18n/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();
  const { data: pageData } = usePageData('about-us');
  return (
    <Layout>
      {/* Premium Hero Section Removed */}

      <MetaSEO 
                seo={pageData?.seo || { metaTitle: 'About Ivy Bridge | Our Story & Academic Mission', metaDescription: 'Discover the journey of Ivy Bridge Global Academic Pathways. Our mission to provide elite education and commitment to student success.' }} 
                defaultTitle="About Us | Ivy Bridge" 
            />

      <section className="relative pt-10 pb-6 md:pt-24 md:pb-16 overflow-hidden bg-[#FAFBFF]">
        {/* Aesthetic Background Elements - Expanded for full-page cohesion */}
        <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 pointer-events-none" />
        <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] bg-blue-400/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 right-[-5%] w-[400px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          {/* Unified Header & Founder Message */}
          <div className="max-w-4xl mx-auto space-y-6 mb-12 md:mb-16 text-left">
            <div className="inline-flex items-center gap-3 bg-primary/5 px-6 py-2 rounded-full border border-primary/10">
              <Sparkles size={14} className="text-primary animate-pulse" />
              <span className="text-primary font-black text-[10px] md:text-xs tracking-[0.4em] uppercase opacity-80">
                OUR LEGACY & MISSION
              </span>
            </div>
            
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-6xl font-black text-navy leading-[0.95] tracking-tighter flex flex-wrap items-center gap-x-4">
              <span className="opacity-90">{t('Message From')}</span>
              <span className="text-primary italic font-serif relative inline-block">
                {t('The Founder')}
                <div className="absolute -bottom-4 left-0 w-full h-[6px] bg-primary/10 rounded-full blur-sm" />
              </span>
            </h1>

            <div className="animate-in fade-in slide-in-from-bottom-4 duration-1200 delay-300">
              <p className="text-xl xs:text-2xl md:text-4xl font-black text-navy tracking-tighter drop-shadow-sm">
                Satyaprakash G.
              </p>
              <div className="h-1 w-20 bg-primary/20 rounded-full mt-2" />
            </div>

          </div>

          
          {/* Timeline Section integrated seamlessly */}
          <div className="max-w-5xl mx-auto space-y-8 md:space-y-16 pb-12">

            {/* The Connected Path Section */}
            <div className="relative py-4 md:py-8">
              {/* Thin dashed connecting line with gradient effect */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 border-l-[2px] border-dashed border-[#5C85D6]/20 -translate-x-1/2" />

              {/* Box 1 */}
              <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8 mb-6 md:mb-16 group cursor-default">
                <div className="hidden md:block w-full md:w-[47%]" />
                <div className="absolute left-4 md:left-1/2 top-9 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-10 flex items-center justify-center">
                  <div className="absolute w-[24px] h-[24px] bg-[#5C85D6]/10 rounded-full animate-[pulse_4s_ease-in-out_infinite] group-hover:opacity-40 transition-opacity duration-300" />
                  <div className="w-[10px] h-[10px] rounded-full bg-white border-[2px] border-[#5C85D6]/40 group-hover:border-[#5C85D6] group-hover:scale-125 transition-all duration-700 shadow-[0_0_15px_rgba(92,133,214,0.1)] group-hover:shadow-[0_0_20px_rgba(92,133,214,0.3)]" />
                </div>
                <div className="w-full md:w-[47%] pl-10 md:pl-0 text-left">
                  <div className="bg-white/60 backdrop-blur-2xl p-4 xs:p-6 sm:p-10 rounded-[1.5rem] xs:rounded-[2.5rem] border border-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.03)] relative overflow-hidden transition-all duration-1000 group-hover:shadow-[0_40px_100px_rgba(92,133,214,0.15)] group-hover:-translate-y-4">
                    <div className="absolute -top-32 -right-32 w-80 h-80 bg-gradient-to-br from-[#5C85D6]/20 to-transparent rounded-full blur-[100px] opacity-40 group-hover:scale-150 transition-transform" />
                    <p className="text-sm xs:text-base md:text-lg text-slate-600 leading-[1.6] font-semibold mb-0 relative z-10 transition-colors duration-700 group-hover:text-navy italic tracking-tight">
                      {t('Education has always been part of my life. I come from a family of educators — my father taught Physics and Science for over 30 years, my mother taught English for more than 20 years, and I have been teaching Mathematics in international schools for over 14 years. Our family moved to Thailand more than 26 years ago, and throughout these years we have seen how students’ learning needs continue to grow and change.')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Box 2 */}
              <div className="relative flex flex-col md:flex-row-reverse md:items-center justify-between gap-4 md:gap-8 mb-10 md:mb-16 group cursor-default">
                <div className="hidden md:block w-full md:w-[47%]" />
                <div className="absolute left-4 md:left-1/2 top-9 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-10 flex items-center justify-center">
                  <div className="absolute w-[24px] h-[24px] bg-[#5C85D6]/10 rounded-full animate-[pulse_4s_ease-in-out_infinite] group-hover:opacity-40 transition-opacity duration-300" />
                  <div className="w-[10px] h-[10px] rounded-full bg-white border-[2px] border-[#5C85D6]/40 group-hover:border-[#5C85D6] group-hover:scale-125 transition-all duration-700 shadow-[0_0_15px_rgba(92,133,214,0.1)] group-hover:shadow-[0_0_20px_rgba(92,133,214,0.3)]" />
                </div>
                <div className="w-full md:w-[47%] pl-10 md:pl-0 text-left">
                  <div className="bg-white/60 backdrop-blur-2xl p-4 xs:p-6 sm:p-10 rounded-[1.5rem] xs:rounded-[2.5rem] border border-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.03)] relative overflow-hidden transition-all duration-1000 group-hover:shadow-[0_40px_100px_rgba(92,133,214,0.15)] group-hover:-translate-y-4">
                    <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-tr from-[#5C85D6]/20 to-transparent rounded-full blur-[100px] opacity-40 group-hover:scale-150 transition-transform" />
                    <p className="text-sm xs:text-base md:text-lg text-slate-600 leading-[1.6] font-semibold mb-0 relative z-10 transition-colors duration-700 group-hover:text-navy italic tracking-tight">
                      {t('One thing I realized over time is that finding truly high-quality teachers is not easy. A great teacher can completely change how a student learns and understands a subject. Because of this, maintaining the highest quality of teachers is our number one priority, and every teacher who joins our platform goes through a careful and strict screening process.')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Box 3 */}
              <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8 mb-6 md:mb-16 group cursor-default">
                <div className="hidden md:block w-full md:w-[47%]" />
                <div className="absolute left-4 md:left-1/2 top-9 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-10 flex items-center justify-center">
                  <div className="absolute w-[24px] h-[24px] bg-[#5C85D6]/10 rounded-full animate-[pulse_4s_ease-in-out_infinite] group-hover:opacity-40 transition-opacity duration-300" />
                  <div className="w-[10px] h-[10px] rounded-full bg-white border-[2px] border-[#5C85D6]/40 group-hover:border-[#5C85D6] group-hover:scale-125 transition-all duration-700 shadow-[0_0_15px_rgba(92,133,214,0.1)] group-hover:shadow-[0_0_20px_rgba(92,133,214,0.3)]" />
                </div>
                <div className="w-full md:w-[47%] pl-10 md:pl-0 text-left">
                  <div className="bg-white/60 backdrop-blur-2xl p-4 xs:p-6 sm:p-10 rounded-[1.5rem] xs:rounded-[2.5rem] border border-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.03)] relative overflow-hidden transition-all duration-1000 group-hover:shadow-[0_40px_100px_rgba(92,133,214,0.15)] group-hover:-translate-y-4">
                    <div className="absolute -top-32 -right-32 w-80 h-80 bg-gradient-to-br from-[#5C85D6]/20 to-transparent rounded-full blur-[100px] opacity-40 group-hover:scale-150 transition-transform" />
                    <p className="text-sm xs:text-base md:text-lg text-slate-600 leading-[1.6] font-semibold mb-0 relative z-10 transition-colors duration-700 group-hover:text-navy italic tracking-tight">
                      {t('This journey started many years ago when parents began asking if I could teach their children online. Many families wanted extra support for their children, but traveling for lessons in a busy city like Bangkok was exhausting. Students were already tired after a full day of school, and parents often did not have the time to travel across the city for tutoring.')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Box 4 */}
              <div className="relative flex flex-col md:flex-row-reverse md:items-center justify-between gap-4 md:gap-8 mb-10 md:mb-16 group cursor-default">
                <div className="hidden md:block w-full md:w-[47%]" />
                <div className="absolute left-4 md:left-1/2 top-9 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-10 flex items-center justify-center">
                  <div className="absolute w-[24px] h-[24px] bg-[#5C85D6]/10 rounded-full animate-[pulse_4s_ease-in-out_infinite] group-hover:opacity-40 transition-opacity duration-300" />
                  <div className="w-[10px] h-[10px] rounded-full bg-white border-[2px] border-[#5C85D6]/40 group-hover:border-[#5C85D6] group-hover:scale-125 transition-all duration-700 shadow-[0_0_15px_rgba(92,133,214,0.1)] group-hover:shadow-[0_0_20px_rgba(92,133,214,0.3)]" />
                </div>
                <div className="w-full md:w-[47%] pl-10 md:pl-0 text-left">
                  <div className="bg-white/60 backdrop-blur-2xl p-4 xs:p-6 sm:p-10 rounded-[1.5rem] xs:rounded-[2.5rem] border border-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.03)] relative overflow-hidden transition-all duration-1000 group-hover:shadow-[0_40px_100px_rgba(92,133,214,0.15)] group-hover:-translate-y-4">
                    <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-tr from-[#5C85D6]/20 to-transparent rounded-full blur-[100px] opacity-40 group-hover:scale-150 transition-transform" />
                    <p className="text-sm xs:text-base md:text-lg text-slate-600 leading-[1.6] font-semibold mb-0 relative z-10 transition-colors duration-700 group-hover:text-navy italic tracking-tight">
                      {t('When I began teaching online, I discovered something interesting — students were often learning even better. They were more relaxed, did not have to spend time traveling, and could focus completely on the lesson. They could learn comfortably from home, fully recharged and ready to study.')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Box 5 */}
              <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8 mb-6 md:mb-16 group cursor-default">
                <div className="hidden md:block w-full md:w-[47%]" />
                <div className="absolute left-4 md:left-1/2 top-9 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-10 flex items-center justify-center">
                  <div className="absolute w-[24px] h-[24px] bg-[#5C85D6]/10 rounded-full animate-[pulse_4s_ease-in-out_infinite] group-hover:opacity-40 transition-opacity duration-300" />
                  <div className="w-[10px] h-[10px] rounded-full bg-white border-[2px] border-[#5C85D6]/40 group-hover:border-[#5C85D6] group-hover:scale-125 transition-all duration-700 shadow-[0_0_15px_rgba(92,133,214,0.1)] group-hover:shadow-[0_0_20px_rgba(92,133,214,0.3)]" />
                </div>
                <div className="w-full md:w-[47%] pl-10 md:pl-0 text-left">
                  <div className="bg-white/60 backdrop-blur-2xl p-4 xs:p-6 sm:p-10 rounded-[1.5rem] xs:rounded-[2.5rem] border border-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.03)] relative overflow-hidden transition-all duration-1000 group-hover:shadow-[0_40px_100px_rgba(92,133,214,0.15)] group-hover:-translate-y-4">
                    <div className="absolute -top-32 -right-32 w-80 h-80 bg-gradient-to-br from-[#5C85D6]/20 to-transparent rounded-full blur-[100px] opacity-40 group-hover:scale-150 transition-transform" />
                    <p className="text-sm xs:text-base md:text-lg text-slate-600 leading-[1.6] font-semibold mb-0 relative z-10 transition-colors duration-700 group-hover:text-navy italic tracking-tight">
                      {t('As more parents heard about this, the number of students grew quickly. Soon, it became impossible for me to teach everyone alone. That was when I started inviting trusted colleagues and professional teachers to help. The demand kept growing, and my wife and I realized that we needed to build a better system that would make learning easier and more effective for both students and teachers.')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Box 6 */}
              <div className="relative flex flex-col md:flex-row-reverse md:items-center justify-between gap-4 md:gap-8 mb-10 md:mb-16 group cursor-default">
                <div className="hidden md:block w-full md:w-[47%]" />
                <div className="absolute left-4 md:left-1/2 top-9 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-10 flex items-center justify-center">
                  <div className="absolute w-[24px] h-[24px] bg-[#5C85D6]/10 rounded-full animate-[pulse_4s_ease-in-out_infinite] group-hover:opacity-40 transition-opacity duration-300" />
                  <div className="w-[10px] h-[10px] rounded-full bg-white border-[2px] border-[#5C85D6]/40 group-hover:border-[#5C85D6] group-hover:scale-125 transition-all duration-700 shadow-[0_0_15px_rgba(92,133,214,0.1)] group-hover:shadow-[0_0_20px_rgba(92,133,214,0.3)]" />
                </div>
                <div className="w-full md:w-[47%] pl-10 md:pl-0 text-left">
                  <div className="bg-white/60 backdrop-blur-2xl p-4 xs:p-6 sm:p-10 rounded-[1.5rem] xs:rounded-[2.5rem] border border-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.03)] relative overflow-hidden transition-all duration-1000 group-hover:shadow-[0_40px_100px_rgba(92,133,214,0.15)] group-hover:-translate-y-4">
                    <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-tr from-[#5C85D6]/20 to-transparent rounded-full blur-[100px] opacity-40 group-hover:scale-150 transition-transform" />
                    <p className="text-sm xs:text-base md:text-lg text-slate-600 leading-[1.6] font-semibold mb-0 relative z-10 transition-colors duration-700 group-hover:text-navy italic tracking-tight">
                      {t('Today, we have created a learning system designed to give students the best possible learning experience. Lessons are one-on-one, every session is recorded, and complete notes are provided after each class so students can focus on understanding rather than rushing to write everything down.')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Box 7 */}
              <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8 mb-6 md:mb-16 group cursor-default">
                <div className="hidden md:block w-full md:w-[47%]" />
                <div className="absolute left-4 md:left-1/2 top-9 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-10 flex items-center justify-center">
                  <div className="absolute w-[24px] h-[24px] bg-[#5C85D6]/10 rounded-full animate-[pulse_4s_ease-in-out_infinite] group-hover:opacity-40 transition-opacity duration-300" />
                  <div className="w-[10px] h-[10px] rounded-full bg-white border-[2px] border-[#5C85D6]/40 group-hover:border-[#5C85D6] group-hover:scale-125 transition-all duration-700 shadow-[0_0_15px_rgba(92,133,214,0.1)] group-hover:shadow-[0_0_20px_rgba(92,133,214,0.3)]" />
                </div>
                <div className="w-full md:w-[47%] pl-10 md:pl-0 text-left">
                  <div className="bg-white/60 backdrop-blur-2xl p-4 xs:p-6 sm:p-10 rounded-[1.5rem] xs:rounded-[2.5rem] border border-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.03)] relative overflow-hidden transition-all duration-1000 group-hover:shadow-[0_40px_100px_rgba(92,133,214,0.15)] group-hover:-translate-y-4">
                    <div className="absolute -top-32 -right-32 w-80 h-80 bg-gradient-to-br from-[#5C85D6]/20 to-transparent rounded-full blur-[100px] opacity-40 group-hover:scale-150 transition-transform" />
                    <p className="text-sm xs:text-base md:text-lg text-slate-600 leading-[1.6] font-semibold mb-0 relative z-10 transition-colors duration-700 group-hover:text-navy italic tracking-tight">
                      {t('From my many years of teaching, one thing has always been clear — every parent wants their child to succeed. But in a busy world, time and travel often become barriers to learning.')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Box 8 - Final Box */}
              <div className="relative flex flex-col md:flex-row-reverse md:items-center justify-between gap-4 md:gap-8 group cursor-default">
                <div className="hidden md:block w-full md:w-[47%]" />
                <div className="absolute left-4 md:left-1/2 top-9 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-10 flex items-center justify-center">
                  <div className="absolute w-[24px] h-[24px] bg-[#5C85D6]/10 rounded-full animate-[pulse_4s_ease-in-out_infinite] group-hover:opacity-40 transition-opacity duration-300" />
                  <div className="w-[10px] h-[10px] rounded-full bg-white border-[2px] border-[#5C85D6]/40 group-hover:border-[#5C85D6] group-hover:scale-125 transition-all duration-700 shadow-[0_0_15px_rgba(92,133,214,0.1)] group-hover:shadow-[0_0_20px_rgba(92,133,214,0.3)]" />
                </div>
                <div className="w-full md:w-[47%] pl-10 md:pl-0 text-left">
                  <div className="bg-white/60 backdrop-blur-2xl p-5 sm:p-10 rounded-[2.5rem] border border-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.03)] relative overflow-hidden transition-all duration-1000 group-hover:shadow-[0_40px_100px_rgba(92,133,214,0.15)] group-hover:-translate-y-4">
                    <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-tr from-[#5C85D6]/20 to-transparent rounded-full blur-[100px] opacity-40 group-hover:scale-150 transition-transform" />
                    <p className="text-base md:text-lg text-slate-600 leading-[1.6] font-semibold mb-0 relative z-10 transition-colors duration-700 group-hover:text-navy italic tracking-tight">
                      {t('NOW ! Our goal is simple: to make high-quality learning accessible, effective, and convenient, allowing students to learn from anywhere')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
