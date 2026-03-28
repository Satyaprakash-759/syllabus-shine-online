import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { CheckCircle2, ChevronRight, Sparkles, BookOpen, Globe, Award, ShieldCheck, Zap, Target } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { usePageData } from '@/hooks/usePageData';
import { MetaSEO } from '@/components/MetaSEO';
import { PageBuilder } from '@/components/PageBuilder';

const contexts = [
    { title: 'Identities and relationships', desc: 'Who am I? Who are we? Exploring identity and relationship with others.' },
    { title: 'Orientation in space and time', desc: 'What is the meaning of \'where\' and \'when\'? Understanding histories and settings.' },
    { title: 'Personal and cultural expression', desc: 'What is the nature and purpose of creative expression? Discovering ideas and feelings.' },
    { title: 'Scientific and technical innovation', desc: 'How do we understand the world in which we live? Impact of science on society.' },
    { title: 'Globalization and sustainability', desc: 'How is everything connected? Exploring human impact on the environment.' },
    { title: 'Fairness and development', desc: 'What are the consequences of our common humanity? Exploring rights and responsibilities.' }
];

const mypSubjects = [
    {
        name: 'Mathematics – Broad Overview',
        note: 'Common focus areas include:',
        items: [
            'Number systems and operations (integers, fractions, decimals, percentages)',
            'Ratios, rates, and proportional reasoning',
            'Algebraic expressions, equations, and simple functions',
            'Patterns and relationships',
            'Geometry: angles, polygons, area, volume, transformations',
            'Pythagorean relationships and geometric reasoning',
            'Introductory coordinate geometry',
            'Statistics: data representation, averages, interpretation',
            'Probability (basic concepts)',
            'Mathematical problem-solving and reasoning'
        ],
        footer: '(Advanced topics such as formal trigonometry are introduced progressively and vary by school.)'
    },
    {
        name: 'English / Language & Literature',
        items: [
            'Reading and analysing fiction and non-fiction texts',
            'Novel, short story, poetry, and drama studies',
            'Writing for different purposes (narrative, persuasive, informational)',
            'Grammar, vocabulary, and language conventions',
            'Speaking and listening skills',
            'Oral presentations and discussions',
            'Media literacy and critical interpretation',
            'Research and referencing skills'
        ]
    },
    {
        name: 'Science',
        items: [
            'Scientific inquiry and laboratory skills',
            'Biology: cells, body systems, ecosystems, reproduction',
            'Chemistry: states of matter, mixtures, reactions, acids and bases',
            'Physics: forces, motion, energy, light, sound',
            'Earth and space science (weather, climate, space systems)',
            'Data collection, analysis, and evaluation',
            'Scientific communication and reflection'
        ]
    }
];

export default function IBMYPPage() {
    const { t } = useLanguage();
    const { data: pageData } = usePageData('ib/middle-years');
    const [submitted, setSubmitted] = React.useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <Layout>




            <MetaSEO 
                seo={pageData?.seo || { metaTitle: 'IB Middle Years Program (MYP) | Ivy Bridge Elite Tutoring', metaDescription: 'Personalized 1-on-1 tutoring for IB MYP students at Ivy Bridge. Expert guidance across all subject groups to excel in eAssessment.' }} 
                defaultTitle="IB MYP | Ivy Bridge Tutoring" 
            />
            <section className="pt-4 md:pt-8 pb-10 md:pb-16 bg-white border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-10 md:mb-24 flex flex-col items-center">
                        <img src="/ib-myp.png" alt="IB MYP" className="h-14 md:h-32 mb-8 object-contain" />
                        <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-7xl font-black text-navy uppercase mb-4 leading-tight">
                            IB Middle <br className="md:hidden" />
                            <span className="text-primary italic">Years Program.</span>
                        </h2>
                        <span className="text-[#5C85D6] font-bold tracking-wider uppercase text-sm md:text-base block">CORE SUBJECT AREAS</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 p-1 xs:p-4 md:p-8">
                        {mypSubjects.map((subject, i) => (
                            <div key={i} className="bg-white/40 backdrop-blur-xl p-4 xs:p-6 sm:p-8 md:p-14 rounded-[1.5rem] xs:rounded-[3rem] border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-700 group">
                                <h3 className="text-2xl xs:text-3xl font-black text-navy mb-8 group-hover:text-primary transition-colors leading-tight">{subject.name}</h3>
                                {subject.note && <p className="text-slate-500 font-bold mb-8 text-sm italic">{subject.note}</p>}
                                <div className="space-y-4">
                                    {subject.items.map((item, j) => (
                                        <div key={j} className="flex items-center gap-3 px-4 py-3 bg-white/60 backdrop-blur-md rounded-2xl border border-white/40 text-slate-700 font-black text-[14px] xs:text-[16px] md:text-[18px] hover:bg-white hover:shadow-lg hover:scale-[1.02] transition-all">
                                            <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                                            {item}
                                        </div>
                                    ))}
                                </div>
                                {subject.footer && (
                                    <div className="mt-10 pt-8 border-t border-slate-100 text-center">
                                        <span className="inline-block px-4 py-2 bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-xl border border-slate-100">{subject.footer}</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* Page Builder Content */}
            {pageData?.content && <PageBuilder content={pageData.content} />}
        </Layout >
    );
}
