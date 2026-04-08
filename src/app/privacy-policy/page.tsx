"use client";
import Layout from '@/components/Layout';
import { ShieldCheck, Lock, Eye, FileText, UserCheck, Globe } from 'lucide-react';
import { usePageData } from '@/hooks/usePageData';
import { MetaSEO } from '@/components/MetaSEO';

const sections = [
    {
        icon: Eye,
        title: 'Information We Collect',
        content: `We collect personal information that you voluntarily provide to us when you register, express interest in our services, or contact us. This includes: name, email address, phone number, student age and grade level, preferred curriculum (Cambridge, IB, Indian, Canadian, Singaporean), and any message or inquiry you submit through our contact forms.`
    },
    {
        icon: Lock,
        title: 'How We Use Your Information',
        content: `We use the information we collect to: provide, operate, and maintain our tutoring services; process and manage your registrations and bookings; communicate with you about schedules, updates, and promotions; improve our website and services; respond to your inquiries and provide customer support; and comply with legal obligations.`
    },
    {
        icon: ShieldCheck,
        title: 'Data Protection & Security',
        content: `We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All data transmissions are encrypted using SSL technology. We restrict access to personal information to authorized employees and service providers who need to know that information.`
    },
    {
        icon: UserCheck,
        title: 'Children\'s Privacy',
        content: `As an educational service provider, we are committed to protecting the privacy of children. We do not knowingly collect personal information from children under 13 without parental consent. If we learn that we have collected personal information from a child under 13, we will promptly delete that information. Parents and guardians can contact us to review, update, or delete their child's information.`
    },
    {
        icon: Globe,
        title: 'Cookies & Tracking',
        content: `Our website uses cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand where our visitors are coming from. You can set your browser to refuse all cookies or indicate when a cookie is being sent. However, some features of our service may not function properly without cookies.`
    },
    {
        icon: FileText,
        title: 'Your Rights',
        content: `You have the right to: access the personal data we hold about you; request correction of inaccurate data; request deletion of your data; object to processing of your data; request restriction of processing; data portability; and withdraw consent. To exercise any of these rights, please contact us at contact@ivybridgestudy.com.`
    }
];

export default function PrivacyPolicyPage() {
    const { data: pageData } = usePageData('privacy-policy');
    return (
        <Layout>
            <MetaSEO
                seo={pageData?.seo || { metaTitle: 'Privacy Policy | Ivy Bridge Online Tutoring', metaDescription: 'Understand how Ivy Bridge protects your personal information and maintains your privacy across our tutoring platform.' }}
                defaultTitle="Privacy Policy | Ivy Bridge"
            />
            <section className="relative pt-12 md:pt-28 pb-20 bg-navy overflow-hidden text-center">
                <div className="absolute inset-0 bg-primary/10 blur-[150px] rounded-full -translate-y-1/2" />
                <div className="max-w-4xl mx-auto px-6 relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
                        <ShieldCheck className="text-primary" size={14} />
                        <span className="text-white/80 text-xs font-bold tracking-widest uppercase">Your Trust Matters</span>
                    </div>
                    <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-7xl font-black text-white leading-[0.95] tracking-tighter mb-6">
                        Privacy <span className="text-primary italic">Policy</span>
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
                        At Ivy Bridge, we are committed to protecting your privacy and ensuring the security of your personal information.
                    </p>
                    <p className="text-sm text-slate-500 mt-6 font-bold">
                        Last updated: February 2026
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="py-8 md:py-20 bg-white">
                <div className="max-w-4xl mx-auto px-6">
                    {/* Introduction */}
                    <div className="mb-6 md:mb-16 p-5 md:p-8 bg-slate-50 rounded-3xl border border-slate-100">
                        <p className="text-slate-600 leading-relaxed font-medium">
                            This Privacy Policy describes how <strong className="text-navy">Ivy Bridge Global Academic Pathways</strong> ("we," "us," or "our") collects, uses, and shares your personal information when you visit our website, use our services, or otherwise interact with us. By using our services, you agree to the collection and use of information in accordance with this policy.
                        </p>
                    </div>

                    {/* Sections */}
                    <div className="space-y-10">
                        {sections.map((section, i) => (
                            <div key={i} className="group">
                                <div className="flex items-start gap-5">
                                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0 mt-1 group-hover:scale-110 transition-transform">
                                        <section.icon size={22} />
                                    </div>
                                    <div>
                                        <h2 className="text-xl xs:text-2xl font-black text-navy mb-4">{section.title}</h2>
                                        <p className="text-slate-500 leading-relaxed font-medium">{section.content}</p>
                                    </div>
                                </div>
                                {i < sections.length - 1 && <div className="border-b border-slate-100 mt-10" />}
                            </div>
                        ))}
                    </div>

                    {/* Contact */}
                    <div className="mt-6 md:mt-16 p-5 md:p-8 bg-navy rounded-3xl text-white text-center">
                        <h3 className="text-2xl font-black mb-4">Questions about our Privacy Policy?</h3>
                        <p className="text-slate-400 mb-6 font-medium">
                            If you have any questions or concerns about this Privacy Policy, please contact us.
                        </p>
                        <a href="mailto:contact@ivybridgestudy.com" className="inline-flex items-center gap-2 bg-primary text-white px-4 md:px-8 py-3 rounded-xl font-bold text-sm hover:scale-105 transition-all">
                            contact@ivybridgestudy.com
                        </a>
                    </div>
                </div>
            </section>
            {/* Page Builder Content */}
            <div className="py-20">
            {/* Page Builder Content Removed */}
            </div>
        </Layout>
    );
}

