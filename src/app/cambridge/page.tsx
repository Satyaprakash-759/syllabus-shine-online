"use client";
import { useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { 
  BookOpen, GraduationCap, Award, CheckCircle2, ChevronRight, 
  Sparkles, Target, Microscope, Calculator, Globe, Star, Zap, ShieldCheck 
} from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { usePageData } from '@/hooks/usePageData';
import { MetaSEO } from '@/components/MetaSEO';
import { PageBuilder } from '@/components/PageBuilder';

const cambridgePrograms = [
  {
    title: 'Cambridge IGCSE',
    slug: 'igcse',
    desc: 'The world\'s most popular international qualification for 14 to 16 year olds, recognized by leading universities worldwide.',
    highlights: ['Science & Math Focus', 'Global Recognition', 'Creative Thinking', 'Integrated Skills'],
    color: 'from-blue-500 to-primary',
    icon: Target
  },
  {
    title: 'Cambridge O Level',
    slug: 'o-level',
    desc: 'An internationally recognized qualification equivalent to Cambridge IGCSE, providing excellent preparation for A Levels.',
    highlights: ['Rigorous Assessment', 'Flexible Combinations', 'University Ready', 'Core Subject Mastery'],
    color: 'from-primary to-navy',
    icon: Award
  },
  {
    title: 'Cambridge AS Level',
    slug: 'as-level',
    desc: 'Engage with rigorous subjects to prepare yourself for higher academic achievement.',
    highlights: ['Deep Understanding', 'Research Skills', 'Independent Study', 'College Level Prep'],
    color: 'from-navy to-slate-800',
    icon: GraduationCap
  },
  {
    title: 'Cambridge A Level',
    slug: 'a-level',
    desc: 'The "Gold Standard" of qualifications, preparing students for success at the world\'s most prestigious universities.',
    highlights: ['Specialized Mastery', 'Advanced Analytics', 'University Ready', 'Scholarship Potential'],
    color: 'from-slate-800 to-black',
    icon: GraduationCap
  }
];

export default function CambridgePage() {
  const { t } = useLanguage();
  const { data: pageData } = usePageData('cambridge');

  return (
    <Layout>


            <MetaSEO 
                seo={pageData?.seo || { metaTitle: 'Cambridge Programs | Ivy Bridge Online Tutoring', metaDescription: 'Explore comprehensive Cambridge curriculum support at Ivy Bridge. Expert 1-on-1 tutoring for IGCSE, O Level, AS & A Level programs.' }} 
                defaultTitle="Cambridge Programs | Ivy Bridge Tutoring" 
            />
      <section id="pathway" className="pt-8 md:pt-32 pb-12 md:pb-40 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12 md:mb-24 px-2">
            <span className="text-primary font-black text-[10px] tracking-[0.4em] uppercase mb-4 block">{t('CAMBRIDGE PATHWAY')}</span>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-7xl font-black text-navy leading-tight tracking-tight">{t('Master every')} <span className="text-primary italic">{t('stage.')}</span></h2>
          </div>

          <div className="flex flex-col gap-10 md:gap-14">
            {cambridgePrograms.map((p, idx) => (
              <div key={idx} className="group relative bg-white/40 backdrop-blur-xl rounded-[1.5rem] xs:rounded-[3rem] md:rounded-[4rem] p-5 xs:p-7 sm:p-8 md:p-14 overflow-hidden border border-white/60 hover:border-primary/20 transition-all duration-700 hover:shadow-primary/10 hover:-translate-y-2">
                <div className={`absolute top-0 right-0 w-[500px] h-full bg-gradient-to-l ${p.color} opacity-0 group-hover:opacity-[0.05] transition-opacity duration-700`} />
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                  <div className="lg:col-span-5 space-y-8">
                    <div className="w-40 sm:w-48 h-20 sm:h-24 bg-white shadow-xl rounded-[2rem] flex items-center justify-center text-primary group-hover:scale-110 transition-all duration-500 p-3 sm:p-4">
                      <img src="/cambridge-logo.png" alt="Cambridge Logo" className="w-full h-full object-contain" />
                    </div>
                    <h3 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black text-navy leading-none uppercase tracking-tighter">{t(p.title)}</h3>
                    <p className="text-lg sm:text-xl text-slate-500 font-bold leading-relaxed">{t(p.desc)}</p>
                    <Link href={`/cambridge/${p.slug}`}
                      className="inline-flex items-center gap-2 text-primary font-black text-sm uppercase tracking-widest hover:translate-x-2 transition-all"
                    >
                      {t('View Programme Details')} <ChevronRight size={18} />
                    </Link>
                  </div>

                  <div className="lg:col-span-1 hidden lg:flex items-center justify-center">
                    <div className="w-px h-64 bg-slate-200" />
                  </div>

                  <div className="lg:col-span-6">
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6 md:mb-10">{t('Programme Highlights')}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {p.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 xs:p-5 bg-white/60 backdrop-blur-md rounded-2xl border border-white/40 group-hover:border-primary/10 transition-all hover:bg-white hover:shadow-lg hover:scale-[1.02]">
                          <ShieldCheck size={20} className="text-primary shrink-0" />
                          <span className="font-black text-slate-700 md:text-base">{t(h)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Page Builder Content */}
      {pageData?.content && <PageBuilder content={pageData.content} />}
    </Layout>
  );
}

