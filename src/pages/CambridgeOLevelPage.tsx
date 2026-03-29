import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import {
    BookOpen, CheckCircle2, ChevronRight, Target, Award, Monitor,
    Sparkles, Clock, Users, MapPin, Building, MessageSquare,
    ShieldCheck, Zap, Globe, GraduationCap
} from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { usePageData } from '@/hooks/usePageData';
import { MetaSEO } from '@/components/MetaSEO';
import { PageBuilder } from '@/components/PageBuilder';

const subjects = [
    { name: 'Accounting (9-1)', code: '0985' },
    { name: 'Biology (9-1)', code: '0970' },
    { name: 'Business Studies (9-1)', code: '0986' },
    { name: 'Chemistry (9-1)', code: '0971' },
    { name: 'Computer Science (9-1)', code: '0984' },
    { name: 'English - First Language (9-1)', code: '0990' },
    { name: 'English - Literature in English (9-1)', code: '0992' },
    { name: 'French (9-1)', code: '7156' },
    { name: 'History (9-1)', code: '0977' },
    { name: 'Information and Communication Technology (9-1)', code: '0983' },
    { name: 'Mathematics (9-1)', code: '0980' },
    { name: 'Physics (9-1)', code: '0972' },
    { name: 'Sciences - Co-ordinated (9-1)', code: '0973' },
    { name: 'Biology', code: '5090' },
    { name: 'Chemistry', code: '5070' },
    { name: 'Computer Science', code: '2210' },
    { name: 'Economics', code: '2281' },
    { name: 'English Language', code: '1123' },
    { name: 'French', code: '3015' },
    { name: 'Mathematics - Additional', code: '4037' },
    { name: 'Physics', code: '5054' },
    { name: 'Science - Combined', code: '5129' }
];



export default function CambridgeOLevelPage() {
    const { t } = useLanguage();
    const { data: pageData } = usePageData('cambridge/o-level');

    return (
        <Layout>

            <MetaSEO 
                seo={pageData?.seo || { metaTitle: 'Cambridge O Level | Elite Ivy Bridge Tutoring', metaDescription: 'Comprehensive 1-on-1 tutoring for Cambridge O Level subjects by Ivy Bridge. Build a strong foundation for advanced academic success.' }} 
                defaultTitle="Cambridge O Level | Ivy Bridge Tutoring" 
            />
            <section className="pt-4 md:pt-8 pb-10 md:pb-16 bg-white border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16 md:mb-24 flex flex-col items-center">
                        <img src="/cambridge-logo.png" alt="Cambridge" className="h-10 md:h-20 mb-8 object-contain" />
                        <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-7xl font-black uppercase mb-4 leading-tight">
                            <span className="text-navy">Cambridge</span> <span className="text-[#5595D9]">O Level</span> <br />
                            <span className="text-primary italic">Program.</span>
                        </h2>
                        <span className="text-[#5C85D6] font-bold tracking-wider uppercase text-sm md:text-base block">{t('CORE SUBJECT AREAS')}</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 p-1 xs:p-4 md:p-8">
                        {[
                            {
                                name: t('Science & Math'),
                                items: ['Mathematics (0980)', 'Physics (0972)', 'Chemistry (0971)', 'Biology (0970)', 'Computer Science (0984)', 'Additional Math (4037)']
                            },
                            {
                                name: t('Commerce & Humanities'),
                                items: ['Accounting (0985)', 'Business Studies (0986)', 'Economics (2281)', 'History (0977)', 'ICT (0983)']
                            },
                            {
                                name: t('Language Skills'),
                                items: ['First Language English (0990)', 'Literature in English (0992)', 'English Language (1123)', 'French (3015)']
                            }
                        ].map((group, i) => (
                            <div key={i} className="bg-white/40 backdrop-blur-xl p-4 xs:p-6 sm:p-8 md:p-14 rounded-[1.5rem] xs:rounded-[3rem] border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-700 group flex flex-col h-full">
                                <h3 className="text-2xl xs:text-3xl font-black text-navy mb-8 group-hover:text-primary transition-colors leading-tight">
                                    {group.name}
                                </h3>
                                <div className="space-y-4">
                                    {group.items.map((item, j) => (
                                        <div key={j} className="flex items-center gap-3 px-4 py-3 bg-white/60 backdrop-blur-md rounded-2xl border border-white/40 text-slate-700 font-black text-[14px] xs:text-[16px] md:text-[18px] hover:bg-white hover:shadow-lg hover:scale-[1.02] transition-all">
                                            <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
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
