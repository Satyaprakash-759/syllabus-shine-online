"use client";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Phone, MessageCircle, Mail, Send, Globe, Star, Banknote, CheckCircle2 } from 'lucide-react';
import Layout from '@/components/Layout';
import { toast } from 'sonner';
import { useLanguage } from '@/i18n/LanguageContext';
import { usePageData } from '@/hooks/usePageData';
import { MetaSEO } from '@/components/MetaSEO';
import { useSiteSettings } from '@/hooks/useSiteSettings';

// ── Validation schema ──────────────────────────────────────────
const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be 100 characters or fewer')
    .regex(/^[^<>{}[\]\\\/]*$/, 'Name contains invalid characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\+?[\d\s\-().]{7,20}$/.test(val),
      'Please enter a valid phone number'
    ),
  subject: z.string().default('general'),
});

type ContactFormData = z.infer<typeof contactSchema>;

// ──────────────────────────────────────────────────────────────

export default function ContactPage() {
  const { t } = useLanguage();
  const { data: pageData } = usePageData('contact');
  const { settings } = useSiteSettings();

  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { subject: 'general' },
  });

  const subject = watch('subject');

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '75957b0c-8c3e-4a4c-812f-41696b1cf684',
          name: data.name,
          email: data.email,
          phone: data.phone || 'Not provided',
          subject: `New Contact Form Submission - Ivy Bridge [${data.subject}]`,
          message: `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || 'Not provided'}\nInterest: ${data.subject}`,
          from_name: 'Ivy Bridge Contact Form',
        }),
      });
      const result = await response.json();
      if (result.success) {
        setIsSuccess(true);
        toast.success(t('Message Sent!'));
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch {
      toast.error('Failed to send message. Please try again.');
    }
  };

  const interests = [
    { id: 'general', label: 'Just saying hi! 👋', icon: MessageCircle, color: 'hover:border-primary hover:text-primary hover:bg-primary/5' },
    { id: 'cambridge', label: 'Cambridge Prep 📚', icon: Phone, color: 'hover:border-cambridge hover:text-cambridge hover:bg-cambridge/5' },
    { id: 'ib', label: 'IB Mastery 🎓', icon: Globe, color: 'hover:border-ib hover:text-ib hover:bg-ib/5' },
    { id: 'trial', label: 'Book a Free Trial ⚡', icon: Star, color: 'hover:border-primary hover:text-primary hover:bg-primary/5' },
    { id: 'pricing', label: 'Pricing Query 💰', icon: Banknote, color: 'hover:border-primary hover:text-primary hover:bg-primary/5' },
  ];

  return (
    <Layout>
      <MetaSEO
        seo={pageData?.seo || { metaTitle: 'Contact Ivy Bridge | Start Your Learning Journey', metaDescription: 'Get in touch with Ivy Bridge for elite online tutoring. Book your free demo session via LINE or our contact form today.' }}
        defaultTitle="Contact Us | Ivy Bridge"
      />
      <div className="min-h-[80vh] bg-white text-slate-900 selection:bg-primary/20 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="bg-white p-4 xs:p-6 sm:p-12 md:p-16 rounded-[2rem] sm:rounded-[3rem] border border-slate-100 shadow-2xl animate-in fade-in zoom-in duration-1000 max-w-4xl mx-auto">
          <h3 className="text-2xl xs:text-3xl font-black text-navy mb-6 text-left">{t('Contact Us')}</h3>

          {isSuccess ? (
            <div className="bg-primary/10 p-8 rounded-3xl text-center animate-in fade-in zoom-in duration-500">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
                <CheckCircle2 size={40} />
              </div>
              <h4 className="text-2xl font-black text-navy mb-4">{t('Thanks! We will')}</h4>
              <p className="text-slate-600 font-medium">{t('get back to you within 24 hours.')}</p>
              <button
                onClick={() => { reset(); setIsSuccess(false); }}
                className="mt-8 text-primary font-black uppercase tracking-widest text-sm hover:underline"
              >
                {t('Send another message')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2 text-left">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    {t('NAME')}
                  </label>
                  <input
                    type="text"
                    {...register('name')}
                    placeholder={t('John Doe')}
                    autoComplete="name"
                    className={`w-full px-4 py-3 bg-slate-50 border rounded-2xl focus:outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all font-medium ${
                      errors.name ? 'border-red-400 bg-red-50' : 'border-slate-100'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs font-semibold ml-1 animate-in fade-in duration-200">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-2 text-left">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    {t('PHONE')}
                  </label>
                  <input
                    type="tel"
                    {...register('phone')}
                    placeholder={t('+1 (555) 000-0000')}
                    autoComplete="tel"
                    className={`w-full px-4 py-3 bg-slate-50 border rounded-2xl focus:outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all font-medium ${
                      errors.phone ? 'border-red-400 bg-red-50' : 'border-slate-100'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs font-semibold ml-1 animate-in fade-in duration-200">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2 text-left">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  {t('EMAIL')}
                </label>
                <input
                  type="email"
                  {...register('email')}
                  placeholder={t('john@example.com')}
                  autoComplete="email"
                  className={`w-full px-6 py-4 bg-slate-50 border rounded-2xl focus:outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all font-medium ${
                    errors.email ? 'border-red-400 bg-red-50' : 'border-slate-100'
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs font-semibold ml-1 animate-in fade-in duration-200">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 xs:py-6 bg-navy hover:bg-slate-900 text-white rounded-3xl font-black text-lg xs:text-xl uppercase tracking-[0.2em] transition-all shadow-xl hover:shadow-navy/20 flex items-center justify-center gap-3 group disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? t('Sending…') : t('SEND MESSAGE')}
                <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
}

