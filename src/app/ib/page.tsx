"use client";
import React from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { useLanguage } from '@/i18n/LanguageContext';
import { usePageData } from '@/hooks/usePageData';
import { MetaSEO } from '@/components/MetaSEO';
import { PageBuilder } from '@/components/PageBuilder';
import { BookOpen, GraduationCap, Award, CheckCircle2, ChevronRight, Sparkles, Target, Globe, ShieldCheck } from 'lucide-react';

const programs = [
  {
    title: 'IB Primary Years Programme',
    slug: 'primary-years',
    desc: 'An inquiry-based, integrated learning method to enhance information and develop young learners.',
    courses: ['Themes of Inquiry', 'Skill Development', 'Learner Profile', 'Global Perspective'],
    color: 'from-blue-500 to-primary',
    image: '/ib-pyp.png'
  },
  {
    title: 'IB Middle Years Programme',
    slug: 'middle-years',
    desc: 'A challenging 5-year framework that encourages students to connect their learning with the real world.',
    courses: ['Language Acquisition', 'Sciences', 'Mathematics', 'Global Contexts'],
    color: 'from-primary to-navy',
    image: '/ib-myp.png'
  },
  {
    title: 'IB Diploma Programme',
    slug: 'diploma',
    desc: 'The gold standard of university preparation, providing breadth and depth of understanding.',
    courses: ['DP Core (TOK/EE/CAS)', '6 Study Groups', 'University Prep', 'Higher Level Options'],
    color: 'from-navy to-primary',
    image: '/ib-dp.png'
  }
];

export default function IBPage() {
  const { t } = useLanguage();
  const { data: pageData } = usePageData('ib');

  return (
    <Layout>


      <MetaSEO 
        seo={pageData?.seo || { metaTitle: 'IB Programs | Ivy Bridge Elite Online Tutoring', metaDescription: 'Master the IB continuum with Ivy Bridge. Expert 1-on-1 tutoring for PYP, MYP, and Diploma Program students.' }} 
        defaultTitle="IB Programs | Ivy Bridge" 
      />
      <section id="levels" className="pt-4 md:pt-8 pb-10 md:pb-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-10 md:mb-24 px-2">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-7xl font-black text-navy leading-tight tracking-tight">{t('THE IB CONTINUUM')} <br className="hidden sm:block" /> <span className="text-primary italic">{t('Master every stage.')}</span></h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:gap-12 p-1 xs:p-4 md:p-12">
            {programs.map((p, idx) => (
              <div key={idx} className="group relative bg-white/40 backdrop-blur-xl rounded-[1.5rem] xs:rounded-3xl md:rounded-[4rem] p-4 xs:p-6 sm:p-8 md:p-12 overflow-hidden border border-white/60 hover:border-primary/20 transition-all duration-700 hover:shadow-primary/10 hover:-translate-y-2">
                <div className={`absolute top-0 right-0 w-[400px] h-full bg-gradient-to-l ${p.color} opacity-0 group-hover:opacity-[0.05] transition-opacity duration-700`} />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-2 xs:p-4 sm:p-6 md:p-12 items-center relative z-10">
                  <div className="lg:col-span-5 space-y-6">
                    <div className="w-40 sm:w-48 h-20 sm:h-24 bg-white shadow-xl rounded-[1.5rem] flex items-center justify-center text-primary group-hover:scale-110 transition-all duration-500 overflow-hidden p-3 sm:p-4">
                       <img src={p.image} alt={p.title} className="w-full h-full object-contain" />
                    </div>
                    <h3 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black text-navy leading-none uppercase tracking-tighter">{t(p.title)}</h3>

                    <p className="text-lg sm:text-xl text-slate-500 font-bold leading-relaxed">{t(p.desc)}</p>
                    <Link href={`/ib/${p.slug}`} className="inline-flex items-center gap-2 text-slate-900 font-black text-sm uppercase tracking-widest group-hover:text-primary transition-colors">
                      {t('View Programme Details')} <ChevronRight size={18} />
                    </Link>
                  </div>

                  <div className="lg:col-span-1 hidden lg:flex items-center justify-center">
                    <div className="w-[1px] h-48 bg-slate-200" />
                  </div>

                  <div className="lg:col-span-6">
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mb-10">{t('Programme Highlights')}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {p.courses.map((course, i) => (
                        <div key={i} className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-md rounded-2xl border border-white/40 group-hover:border-primary/10 transition-all hover:bg-white hover:shadow-lg hover:scale-[1.02]">
                          <ShieldCheckIcon size={18} className="text-primary shrink-0" />
                          <span className="font-black text-slate-700 text-sm md:text-base">{t(course)}</span>
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

function ShieldCheckIcon(props: any) {
  return <ShieldCheck {...props} />;
}

