"use client";
import React from 'react';
import Layout from '@/components/Layout';
import { useLanguage } from '@/i18n/LanguageContext';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion";
import { HelpCircle, MessageCircle, BookOpen, GraduationCap, Clock, Award, ShieldCheck, Sparkles, MessageSquare } from 'lucide-react';
import { usePageData } from '@/hooks/usePageData';
import { MetaSEO } from '@/components/MetaSEO';
import { useSiteSettings } from '@/hooks/useSiteSettings';

export default function FAQPage() {
    const { t } = useLanguage();
    const { data: pageData } = usePageData('faq');
    const { settings } = useSiteSettings();

    const lineUrl = settings?.footer?.socialLinks?.line || '#';

    const faqs = [
        {
            category: "General Information",
            icon: HelpCircle,
            questions: [
                {
                    q: "What is Ivy Bridge?",
                    a: "Ivy Bridge is Thailand's premier online academic institution, specializing in 1-on-1 elite tutoring for international curricula including Cambridge (IGCSE, A-Level) and International Baccalaureate (IB)."
                },
                {
                    q: "How does 1-on-1 tutoring work?",
                    a: "Our sessions are conducted via a high-definition, interactive digital classroom. Each student is paired with a dedicated specialist who tailors the entire curriculum to the student's specific speed, strengths, and academic goals."
                }
            ]
        },
        {
            category: "Academic Programs",
            icon: GraduationCap,
            questions: [
                {
                    q: "Which curricula do you cover?",
                    a: "We provide comprehensive support for Cambridge IGCSE, O Level, AS & A Level, and the full IB continuum (PYP, MYP, DP). We also offer specialized coaching for Indian (CBSE), Canadian and Singaporean Curriculums, as well as SAT, GED, and entrance exams for top-tier international schools."
                },
                {
                    q: "How do you select your instructors?",
                    a: "Every Ivy Bridge mentor undergoes a rigorous multi-stage selection process. We only hire active scholars, subject specialists, or certified teachers with proven track records in high-stakes international examinations."
                }
            ]
        },
        {
            category: "Logistics & Scheduling",
            icon: Clock,
            questions: [
                {
                    q: "Are the sessions recorded?",
                    a: "Yes! Every single live session is recorded and stored in the student's private portal. This allows for unlimited review and revision, ensuring that no detail from the lesson is ever lost."
                },
                {
                    q: "What is your scheduling policy?",
                    a: "We offer maximum flexibility to accommodate the busy lives of elite students. Lessons can be scheduled on weekdays or weekends, and can be adjusted with prior notice to the academic coordinator."
                }
            ]
        },
        {
            category: "Trial & Getting Started",
            icon: Sparkles,
            questions: [
                {
                    q: "Can I try a session before committing?",
                    a: "Absolutely. We believe in the quality of our teaching. We offer a complimentary, no-obligation demo session where the student can experience our platform and meet a potential mentor."
                },
                {
                    q: "How do I start?",
                    a: "Simply click the 'Book a Demo' button, fill in your details, and our academic coordinator will contact you within 24 hours to arrange an assessment and trial lesson."
                }
            ]
        }
    ];

    return (
        <Layout>
            <MetaSEO
                seo={pageData?.seo || { metaTitle: 'Frequently Asked Questions | Ivy Bridge', metaDescription: 'Find answers to common questions about Ivy Bridge online tutoring, curriculums, and demo sessions.' }}
                defaultTitle="FAQ | Ivy Bridge"
            />
            
            <section className="relative pt-16 pb-12 overflow-hidden bg-slate-900">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=2000')] bg-fixed bg-cover bg-center opacity-10" />
                    <div className="absolute top-[10%] left-[-10%] w-[50rem] h-[50rem] bg-primary/20 blur-[150px] rounded-full animate-pulse" />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black tracking-[0.3em] uppercase mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <HelpCircle size={16} /> {t('Support Center')}
                    </div>
                    <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-[6rem] font-black text-white mb-8 md:mb-10 leading-[1.1] md:leading-[0.95] tracking-tight animate-in fade-in slide-in-from-bottom-6 duration-1000">
                        {t('Frequently Asked')} <span className="text-primary italic font-serif">{t('Questions.')}</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-400 leading-relaxed font-medium mb-12 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        {t("Find clarity on our methodology, programs, and logistics. Everything you need to know about the Ivy Bridge experience.")}
                    </p>
                </div>
            </section>

            <section className="py-8 md:py-24 bg-white">
                <div className="max-w-4xl mx-auto px-6">
                    <Accordion type="single" collapsible className="space-y-12">
                        {faqs.map((cat, idx) => (
                            <div key={idx} className="space-y-6">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                        <cat.icon size={24} />
                                    </div>
                                    <h2 className="text-2xl font-black text-navy uppercase tracking-wider">{t(cat.category)}</h2>
                                </div>
                                {cat.questions.map((faq, fIdx) => (
                                    <AccordionItem key={fIdx} value={`item-${idx}-${fIdx}`} className="border border-slate-100 rounded-[1rem] sm:rounded-[2.5rem] px-3 sm:px-8 py-0.5 sm:py-2 mb-4 hover:border-primary/20 transition-all bg-[#FAFBFF] shadow-sm">
                                        <AccordionTrigger className="text-left text-sm xs:text-base md:text-xl font-bold text-navy hover:no-underline hover:text-primary transition-colors py-4 sm:py-6">
                                            {t(faq.q)}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-slate-600 text-base leading-relaxed pb-8">
                                            {t(faq.a)}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </div>
                        ))}
                    </Accordion>

                    {/* CTA section inside FAQ */}
                    <div className="mt-32 p-5 sm:p-12 rounded-[1.5rem] sm:rounded-[3.5rem] bg-navy text-center text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 blur-[100px] rounded-full" />
                        <div className="relative z-10">
                            <h3 className="text-2xl md:text-4xl font-black mb-6">{t('Still have questions?')}</h3>
                            <p className="text-slate-300 text-lg mb-10 max-w-xl mx-auto">
                                {t('Our academic coordinators are ready to help you map out your educational journey.')}
                            </p>
                            <div className="flex justify-center">
                                <a href={lineUrl} target="_blank" rel="noopener noreferrer" className="px-10 py-5 bg-white text-navy rounded-2xl font-black text-lg hover:bg-primary hover:text-white transition-all shadow-xl flex items-center justify-center gap-3">
                                    <MessageSquare size={24} />
                                    {t('Chat with us on LINE')}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}

