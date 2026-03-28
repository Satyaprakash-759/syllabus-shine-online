import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { 
    BookOpen, CheckCircle2, ChevronRight, Target, Award,
    Sparkles, ShieldCheck, Globe, GraduationCap
} from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { usePageData } from '@/hooks/usePageData';
import { MetaSEO } from '@/components/MetaSEO';
import { PageBuilder } from '@/components/PageBuilder';

export default function CanadianCurriculumPage() {
    const { t } = useLanguage();
    const { data: pageData } = usePageData('international/canadian');

    return (
        <Layout>

            <MetaSEO 
                seo={pageData?.seo || { metaTitle: 'Canadian Curriculum | Ivy Bridge Elite Tutoring', metaDescription: 'Specialized 1-on-1 tutoring following Canadian standards at Ivy Bridge. Expert support for Math, Science, and Humanities.' }} 
                defaultTitle="Canadian Curriculum | Ivy Bridge" 
            />
            <section className="pt-4 md:pt-8 pb-10 md:pb-16 bg-white border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-10 md:mb-24 flex flex-col items-center">
                        <img src="/canada-logo.png" alt="Canadian Curriculum" className="h-14 md:h-32 mb-8 object-contain" />
                        <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-7xl font-black uppercase mb-4 leading-tight">
                            <span className="text-navy">Canadian</span> <span className="text-rose-600">Global</span> <br />
                            <span className="text-primary italic">Success.</span>
                        </h2>
                        <span className="text-[#5C85D6] font-bold tracking-wider uppercase text-sm md:text-base block">{t('CORE SUBJECT AREAS')}</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 p-1 xs:p-4 md:p-8">
                        {[
                            {
                                name: 'STEM & Math',
                                items: ['Ontario Mathematics', 'BC Curriculum Math', 'Physics & Chemistry', 'Life Sciences', 'Earth & Space Science']
                            },
                            {
                                name: 'Language & Arts',
                                items: ['English Language Arts', 'French Immersion', 'Creative Writing', 'Media Studies', 'Visual Arts']
                            },
                            {
                                name: 'Social Sciences',
                                items: ['Canadian History', 'World Geography', 'Social Justice', 'Business Studies', 'Psychology']
                            }
                        ].map((group, i) => (
                            <div key={i} className="bg-white/40 backdrop-blur-xl p-4 xs:p-6 sm:p-8 md:p-14 rounded-[1.5rem] xs:rounded-[3rem] border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-700 group flex flex-col h-full">
                                <h3 className="text-2xl xs:text-3xl font-black text-navy mb-8 group-hover:text-primary transition-colors leading-tight">
                                    {t(group.name)}
                                </h3>
                                <div className="space-y-4">
                                    {group.items.map((item, j) => (
                                        <div key={j} className="flex items-center gap-3 px-4 py-3 bg-white/60 backdrop-blur-md rounded-2xl border border-white/40 text-slate-700 font-black text-[14px] xs:text-[16px] md:text-[18px] hover:bg-white hover:shadow-lg hover:scale-[1.02] transition-all">
                                            <div className="w-2 h-2 rounded-full bg-rose-600 shrink-0" />
                                            {item}
                                        </div>
                                    ))}
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
