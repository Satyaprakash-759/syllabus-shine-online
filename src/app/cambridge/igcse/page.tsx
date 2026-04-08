"use client";
import React from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import {
    BookOpen, CheckCircle2, ChevronRight, Target, Award, Monitor,
    Sparkles, Clock, Star, Users, MapPin, Building, MessageSquare,
    ShieldCheck, Zap, Globe, GraduationCap, X
} from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { usePageData } from '@/hooks/usePageData';
import { MetaSEO } from '@/components/MetaSEO';
import { PageBuilder } from '@/components/PageBuilder';

export default function CambridgeIGCSEPage() {
    const { t } = useLanguage();
    const { data: pageData } = usePageData('cambridge/igcse');

    return (
        <Layout>



            <MetaSEO 
                seo={pageData?.seo || { metaTitle: 'Cambridge IGCSE | Ivy Bridge Elite Online Tutoring', metaDescription: 'Expert 1-on-1 Cambridge IGCSE tutoring in Bangkok by Ivy Bridge. Specialist support for Mathematics, Sciences, Commerce and more.' }} 
                defaultTitle="Cambridge IGCSE | Ivy Bridge Tutoring" 
            />
            <section className="pt-4 md:pt-8 pb-10 md:pb-16 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16 md:mb-24 flex flex-col items-center">
                        <img src="/cambridge-logo.png" alt="Cambridge" className="h-10 md:h-20 mb-8 object-contain" />
                        <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-7xl font-black uppercase mb-4 leading-tight">
                            <span className="text-navy">Cambridge</span> <span className="text-[#5595D9]">IGCSE</span> <br />
                            <span className="text-primary italic">Program.</span>
                        </h2>
                        <span className="text-[#5C85D6] font-bold tracking-wider uppercase text-sm md:text-base block">CORE SUBJECT AREAS</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 p-1 xs:p-4 md:p-8">
                        {[
                            {
                                name: 'Science & Math',
                                items: ['Mathematics (0580)', 'Physics (0625)', 'Chemistry (0620)', 'Biology (0610)', 'Combined Science (0653)', 'Additional Math (0606)']
                            },
                            {
                                name: 'Commerce & Humanities',
                                items: ['Accounting (0452)', 'Business Studies (0450)', 'Economics (0455)', 'History (0470)', 'Geography (0460)']
                            },
                            {
                                name: 'Language & Tech',
                                items: ['First Language English (0500)', 'English as Second Language (0510)', 'ICT (0417)', 'Computer Science (0478)', 'French (0520)']
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

