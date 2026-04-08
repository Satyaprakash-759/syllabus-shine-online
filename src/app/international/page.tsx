"use client";
import React from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { CheckCircle2, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { usePageData } from '@/hooks/usePageData';
import { MetaSEO } from '@/components/MetaSEO';
import { PageBuilder } from '@/components/PageBuilder';

const programs = [
    {
        title: 'Indian (CBSE)',
        slug: 'indian',
        desc: 'Excel in worldwide standards with continuous and comprehensive evaluation methodologies, tailored for Indian international students.',
        courses: ['CBSE Mathematics', 'CBSE Science', 'Social Studies', 'Language Studies', 'Competitive Exam Prep'],
        color: 'from-purple-500 to-indigo-600',
        image: '/cbse-logo.png'
    },
    {
        title: 'Canadian Curriculum',
        slug: 'canadian',
        desc: 'Global academic excellence following the world-class Canadian education standards, focusing on critical thinking and project-based learning.',
        courses: ['English Language Arts', 'Mathematics', 'Science & Tech', 'Social Studies', 'Arts & Physical Ed'],
        color: 'from-red-500 to-rose-600',
        image: '/canada-logo.png'
    },
    {
        title: 'Singaporean Curriculum',
        slug: 'singaporean',
        desc: 'Master world-leading Mathematics and Science standards with specialized mentors trained in Singaporean pedagogy.',
        courses: ['Singapore Maths', 'Science (Physics/Chem/Bio)', 'English Language', 'Mother Tongue', 'Inquiry-based Projects'],
        color: 'from-primary to-blue-700',
        image: '/singapore-logo.png'
    }
];

export default function InternationalPage() {
    const { t } = useLanguage();
    const { data: pageData } = usePageData('international');

    return (
        <Layout>


            <MetaSEO 
                seo={pageData?.seo || { metaTitle: 'International Curriculums | Ivy Bridge Elite Tutoring', metaDescription: 'Specialized 1-on-1 tutoring for Indian (CBSE), Canadian, and Singaporean curriculums at Ivy Bridge. Global academic support from expert mentors.' }} 
                defaultTitle="International Curriculums | Ivy Bridge Tutoring" 
            />
            <section id="levels" className="pt-4 md:pt-8 pb-10 md:pb-32 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="text-center mb-10 md:mb-24 px-2">
                        <span className="text-primary font-black text-[10px] tracking-[0.4em] uppercase mb-4 block">GLOBAL RECOGNITION</span>
                        <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight tracking-tight">{t('Elite support for')} <span className="text-primary italic">{t('every student.')}</span></h2>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:gap-12 p-1 xs:p-4 md:p-12">
                        {programs.map((p, idx) => (
                            <div key={idx} className="group relative bg-white/40 backdrop-blur-xl rounded-[1.5rem] xs:rounded-3xl md:rounded-[4rem] p-4 xs:p-6 sm:p-8 md:p-12 overflow-hidden border border-white/60 hover:border-primary/20 transition-all duration-700 hover:shadow-primary/10 hover:-translate-y-2">
                                <div className={`absolute top-0 right-0 w-[400px] h-full bg-gradient-to-l ${p.color} opacity-0 group-hover:opacity-[0.05] transition-opacity duration-700`} />

                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-2 xs:p-4 sm:p-6 md:p-12 items-center relative z-10">
                                    <div className="lg:col-span-5 space-y-6">
                                        <div className="w-20 h-20 bg-white shadow-xl rounded-[1.5rem] flex items-center justify-center text-primary group-hover:scale-110 transition-all duration-500 overflow-hidden p-2">
                                            <img src={p.image} alt={p.title} className="w-full h-full object-contain" />
                                        </div>
                                        <h3 className="text-2xl xs:text-3xl sm:text-4xl font-black text-slate-900 leading-tight">{t(p.title)}</h3>
                                        <p className="text-base sm:text-lg text-slate-500 font-medium leading-relaxed">{t(p.desc)}</p>
                                        <Link href={`/international/${p.slug}`} className="inline-flex items-center gap-2 text-slate-900 font-black text-sm uppercase tracking-widest group-hover:text-primary transition-colors">
                                            {t('View Programme Details')} <ChevronRight size={18} />
                                        </Link>
                                    </div>

                                    <div className="lg:col-span-1 hidden lg:flex items-center justify-center">
                                        <div className="w-[1px] h-48 bg-slate-200" />
                                    </div>

                                    <div className="lg:col-span-6">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8">{t('Curriculum Highlights')}</p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {p.courses.map((course, i) => (
                                                <div key={i} className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-md rounded-2xl border border-white/40 group-hover:border-primary/10 transition-all hover:bg-white hover:shadow-lg hover:scale-[1.02]">
                                                    <CheckCircle2 size={18} className="text-primary shrink-0" />
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

