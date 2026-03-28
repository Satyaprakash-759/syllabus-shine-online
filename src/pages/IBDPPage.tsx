import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { CheckCircle2, ChevronRight, Sparkles, BookOpen, GraduationCap, Target, Award, ShieldCheck, Microscope } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { usePageData } from '@/hooks/usePageData';
import { MetaSEO } from '@/components/MetaSEO';
import { PageBuilder } from '@/components/PageBuilder';

const dpSubjects = [
    {
        name: 'Mathematics',
        intro: 'Students select one of two mathematics pathways:',
        subGroups: [
            {
                title: 'Mathematics: Analysis and Approaches (AA) – SL / HL',
                items: [
                    'Algebra, functions, and graphs',
                    'Trigonometry and calculus',
                    'Proof, reasoning, and mathematical modelling',
                    'Problem-solving with and without technology'
                ]
            },
            {
                title: 'Mathematics: Applications and Interpretation (AI) – SL / HL',
                items: [
                    'Statistics and probability',
                    'Mathematical modelling and real-world applications',
                    'Use of technology for data analysis',
                    'Financial mathematics and optimisation'
                ]
            }
        ]
    },
    {
        name: 'English (Studies in Language & Literature)',
        intro: 'English develops critical literacy, communication, and analytical skills essential for academic success.',
        subGroups: [
            {
                title: 'English Language & Literature – SL / HL',
                items: [
                    'Analysis of literary and non-literary texts',
                    'Comparative text studies',
                    'Academic and creative writing',
                    'Oral presentations and individual oral assessments',
                    'Media and language in global contexts'
                ]
            }
        ]
    },
    {
        name: 'Sciences',
        intro: 'Students choose one or more science subjects, developing strong experimental and analytical skills.',
        subGroups: [
            {
                title: 'Commonly Offered Sciences',
                items: [
                    'Biology',
                    'Chemistry',
                    'Physics',
                    'Environmental Systems and Societies'
                ]
            },
            {
                title: 'Key Focus Areas',
                items: [
                    'Scientific inquiry and practical investigations',
                    'Data analysis and evaluation',
                    'Conceptual understanding across scientific disciplines',
                    'Application of science to real-world and global issues'
                ]
            }
        ]
    },
    {
        name: 'Languages (Language Acquisition)',
        intro: 'Students study an additional language to develop multilingual communication and intercultural understanding.',
        subGroups: [
            {
                title: 'Language Options',
                items: [
                    'Language B (SL / HL)',
                    'Language ab initio (SL)'
                ]
            }
        ]
    }
];

export default function IBDPPage() {
    const { t } = useLanguage();
    const { data: pageData } = usePageData('ib/diploma');
    const [submitted, setSubmitted] = React.useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <Layout>

            <MetaSEO 
                seo={pageData?.seo || { metaTitle: 'IB Diploma Program (DP) | Ivy Bridge Elite Tutoring', metaDescription: 'Advanced 1-on-1 tutoring for the IB Diploma Program at Ivy Bridge. Expert support for IA, TOK, and all HL/SL subject groups.' }} 
                defaultTitle="IB Diploma | Ivy Bridge Tutoring" 
            />
            <section className="pt-4 md:pt-8 pb-10 md:pb-16 bg-white border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-10 md:mb-24 flex flex-col items-center">
                        <img src="/ib-dp.png" alt="IB DP" className="h-14 md:h-32 mb-8 object-contain" />
                        <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-7xl font-black text-navy uppercase mb-1 md:mb-4 leading-tight">
                            IB Diploma <br className="md:hidden" />
                            <span className="text-primary italic">Program.</span>
                        </h2>
                        <span className="text-[#5C85D6] font-bold tracking-wider uppercase text-sm md:text-base block">CORE SUBJECT AREAS</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 p-1 xs:p-4 md:p-8">
                        {dpSubjects.map((subject, i) => (
                            <div key={i} className="bg-white/40 backdrop-blur-xl p-4 xs:p-6 sm:p-8 md:p-14 rounded-[1.5rem] xs:rounded-[3rem] border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-700 group flex flex-col h-full">
                                <h3 className="text-2xl xs:text-3xl font-black text-navy mb-8 group-hover:text-primary transition-colors leading-tight">
                                    {subject.name}
                                </h3>
                                {subject.intro && <p className="text-slate-500 font-bold mb-8 text-sm italic leading-relaxed">{subject.intro}</p>}
                                <div className="space-y-6">
                                    {subject.subGroups.map((group, j) => (
                                        <div key={j} className="space-y-4">
                                            <p className="text-navy font-black text-xs uppercase tracking-widest px-2">{group.title}</p>
                                            <div className="space-y-3">
                                                {group.items.map((item, k) => (
                                                    <div key={k} className="flex items-center gap-3 px-4 py-2.5 bg-white/60 backdrop-blur-md rounded-2xl border border-white/40 text-slate-700 font-black text-[14px] xs:text-[15px] md:text-[17px] hover:bg-white hover:shadow-lg hover:scale-[1.02] transition-all">
                                                        <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                                                        {item}
                                                    </div>
                                                ))}
                                            </div>
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
