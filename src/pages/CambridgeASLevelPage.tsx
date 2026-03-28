import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import {
    BookOpen, CheckCircle2, ChevronRight, Target, Award, Monitor,
    Sparkles, Clock, Star, Users, MapPin, Building, MessageSquare,
    ShieldCheck, Zap, Globe, GraduationCap
} from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { usePageData } from '@/hooks/usePageData';
import { MetaSEO } from '@/components/MetaSEO';
import { PageBuilder } from '@/components/PageBuilder';

const subjects = [
    {
        group: 'Cambridge AS Level', items: [
            { name: 'Accounting', code: '9706' },
            { name: 'Biology', code: '9700' },
            { name: 'Business', code: '9609' },
            { name: 'Chemistry', code: '9701' },
            { name: 'Computer Science', code: '9618' },
            { name: 'English - Language and Literature', code: '8695' },
            { name: 'English - Literature', code: '9695' },
            { name: 'English General Paper', code: '8021' },
            { name: 'English Language', code: '9093' },
            { name: 'Mathematics', code: '9709' },
            { name: 'Mathematics - Further', code: '9231' },
            { name: 'Physics', code: '9702' }
        ]
    }
];

const testimonials = [
    { name: 'Sudhir', role: 'Cambridge A Level', content: "My son sudhir keeps to development properly way to the teacher's steering. He has scored A* in Math, Physics and Biology. As dad and mom we are able to see he has sincerely improvised.", rating: 5 },
    { name: 'Mandal', role: 'Cambridge As Level', content: "My daughter Polimandal is analyzing in Grade 11 and is taking Accountancy instructions from Mohit Agarwal sir. She's very glad with his commands.", rating: 5 },
];

export default function CambridgeASLevelPage() {
    const { t } = useLanguage();
    const { data: pageData } = usePageData('cambridge/as-level');
    const [submitted, setSubmitted] = React.useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <Layout>


            <MetaSEO 
                seo={pageData?.seo || { metaTitle: 'Cambridge AS Level | Ivy Bridge Elite Online Tutoring', metaDescription: 'Rigorous 1-on-1 tutoring for Cambridge AS Level at Ivy Bridge. Expert support for deep subject understanding and exams.' }} 
                defaultTitle="Cambridge AS Level | Ivy Bridge Tutoring" 
            />
            <section className="pt-4 md:pt-8 pb-10 md:pb-16 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16 md:mb-24 flex flex-col items-center">
                        <img src="/cambridge-logo.png" alt="Cambridge" className="h-10 md:h-20 mb-8 object-contain" />
                        <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-7xl font-black uppercase mb-4 leading-tight">
                            <span className="text-navy">Cambridge</span> <span className="text-[#5595D9]">AS Level</span> <br />
                            <span className="text-primary italic">Program.</span>
                        </h2>
                        <span className="text-[#5C85D6] font-bold tracking-wider uppercase text-sm md:text-base block">CORE SUBJECT AREAS</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 p-1 xs:p-4 md:p-8">
                        {[
                            {
                                name: 'STEM & Math',
                                items: ['Mathematics (9709)', 'Further Math (9231)', 'Physics (9702)', 'Chemistry (9701)', 'Biology (9700)', 'Computer Science (9618)']
                            },
                            {
                                name: 'Business & Finance',
                                items: ['Accounting (9706)', 'Business (9609)', 'Economics (9708)']
                            },
                            {
                                name: 'English & Humanities',
                                items: ['English Language (9093)', 'English Literature (9695)', 'English Lang & Lit (8695)', 'English General Paper (8021)']
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



            {/* Testimonials */}
            <section className="py-10 md:py-32 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 md:p-8">
                        {testimonials.map((t, i) => (
                            <div key={i} className="bg-slate-50 p-5 xs:p-8 md:p-12 rounded-[1.5rem] xs:rounded-3xl md:rounded-[4rem] border border-slate-100 relative group overflow-hidden">
                                <div className="flex text-amber-400 mb-6">
                                    {Array(t.rating).fill(0).map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                                </div>
                                <p className="text-lg text-slate-600 font-medium italic mb-10 leading-relaxed">"{t.content}"</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-black">
                                        {t.name[0]}
                                    </div>
                                    <div>
                                        <h4 className="font-black text-navy">{t.name}</h4>
                                        <p className="text-xs font-bold text-primary tracking-widest uppercase">{t.role}</p>
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
