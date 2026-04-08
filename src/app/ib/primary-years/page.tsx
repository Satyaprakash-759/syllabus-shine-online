"use client";
import React from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { CheckCircle2, ChevronRight, Sparkles, BookOpen, Target } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { usePageData } from '@/hooks/usePageData';
import { MetaSEO } from '@/components/MetaSEO';
import { PageBuilder } from '@/components/PageBuilder';

const themes = [
    { theme: 'Who we are', desc: 'Inquiry into the nature of the self; beliefs and values; personal, physical, mental, social, and spiritual health.' },
    { theme: 'Where we are in place and time', desc: 'Inquiry into orientation in place and time; personal histories; homes and journeys.' },
    { theme: 'How we express ourselves', desc: 'Inquiry into the ways in which we discover and express ideas, feelings, nature, and culture.' },
    { theme: 'How the world works', desc: 'Inquiry into the natural world and its laws; the interaction between the natural world and human societies.' },
    { theme: 'How we organize ourselves', desc: 'Inquiry into the interconnectedness of human-made systems and communities.' },
    { theme: 'Sharing the planet', desc: 'Inquiry into rights and responsibilities in the struggle to share finite resources with other people.' }
];

const pypSubjects = [
    {
        name: 'English',
        items: [
            'Listening and speaking',
            'Phonics and spelling',
            'Reading comprehension',
            'Grammar and sentence structure',
            'Creative and factual writing',
            'Research and presentation skills',
            'Media and visual literacy'
        ]
    },
    {
        name: 'Mathematics',
        items: [
            'Number and place value',
            'Addition, subtraction, multiplication, and division',
            'Fractions, decimals, and percentages',
            'Patterns and sequences',
            'Measurement (time, length, mass, capacity)',
            'Data handling (graphs, charts, probability)',
            'Shape and space (2D and 3D shapes)',
            'Problem-solving and real-life applications'
        ]
    },
    {
        name: 'Science',
        items: [
            'Living things (plants, animals, humans)',
            'Earth and space (weather, seasons, planets)',
            'Materials and matter (states of matter, properties)',
            'Forces and energy (light, sound, movement)',
            'Scientific inquiry and experimentation'
        ]
    }
];

export default function IBPYPPage() {
    const { t } = useLanguage();
    const { data: pageData } = usePageData('ib/primary-years');

    return (
        <Layout>
            <MetaSEO 
                seo={pageData?.seo || { metaTitle: 'IB Primary Years Program (PYP) | Ivy Bridge Elite Tutoring', metaDescription: 'Early childhood and primary 1-on-1 tutoring for the IB PYP at Ivy Bridge. Developing inquisitive and caring learners from the start.' }} 
                defaultTitle="IB PYP | Ivy Bridge Tutoring" 
            />




            {/* Core Subject Areas Section */}
            <section className="pt-4 md:pt-8 pb-10 md:pb-16 bg-white border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-10 md:mb-24 flex flex-col items-center">
                        <img src="/ib-pyp.png" alt="IB PYP" className="h-14 md:h-32 mb-8 object-contain" />
                        <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-7xl font-black text-navy uppercase mb-4 leading-tight">
                            IB Primary <br className="md:hidden" />
                            <span className="text-primary italic">Years Program.</span>
                        </h2>
                        <span className="text-[#5C85D6] font-bold tracking-wider uppercase text-sm md:text-base block">CORE SUBJECT AREAS</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 p-1 xs:p-4 md:p-8">
                        {pypSubjects.map((subject, i) => (
                            <div key={i} className="bg-white/40 backdrop-blur-xl p-4 xs:p-6 sm:p-8 md:p-14 rounded-[1.5rem] xs:rounded-[3rem] border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-700 group flex flex-col h-full">
                                <h3 className="text-2xl xs:text-3xl font-black text-navy mb-6 group-hover:text-primary transition-colors leading-tight">
                                    {subject.name}
                                </h3>
                                {/* No intro for PYP subjects */}
                                <div className="space-y-3.5 mb-8">
                                    {subject.items.map((item, j) => (
                                        <div key={j} className="flex items-center gap-3 px-4 py-2.5 bg-white/60 backdrop-blur-md rounded-2xl border border-white/40 text-slate-700 font-black text-[14px] xs:text-[15px] md:text-[17px] hover:bg-white hover:shadow-lg hover:scale-[1.02] transition-all">
                                            <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                                            {item}
                                        </div>
                                    ))}
                                </div>
                                {/* No footer for PYP subjects */}
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

