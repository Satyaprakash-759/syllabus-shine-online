import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, CheckCircle2, ChevronDown, Play, BookOpen, Wifi, Clock, Users, Award, Lightbulb, Monitor, GraduationCap, FileText, Banknote, Bookmark, Library, Globe, Medal, Mail, Phone, User, Send, MessageSquare, Sparkles, Target, Eye, ChevronRight, Smile, Tablet, Facebook } from 'lucide-react';
import Layout from '@/components/Layout';
import { useLanguage } from '@/i18n/LanguageContext';
import { thTranslations } from '@/i18n/th';
import { usePageData } from '@/hooks/usePageData';
import { MetaSEO } from '@/components/MetaSEO';
import { useSiteSettings } from '@/hooks/useSiteSettings';


export default function Index() {
  const [activeCategory, setActiveCategory] = useState<'Cambridge' | 'IB' | 'International'>('Cambridge');
  const { t } = useLanguage();
  const { data: pageData } = usePageData('home');
  const { settings } = useSiteSettings();

  const [isProgramsVisible, setIsProgramsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const programsRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Attempt to auto-play video programmatically on load
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.warn("Video auto-play was prevented by the browser:", err);
      });
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsProgramsVisible(true);
        // We don't unobserve because the user might want to see it again if they scroll up/down, 
        // though usually one-time is better for performance.
        // observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });

    if (programsRef.current) observer.observe(programsRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, you'd send data to an API here
  };
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star key={i} size={14} className={i < Math.floor(rating) ? "text-[#facc15] fill-[#facc15]" : "text-gray-300"} />
    ));
  };

  const ProgramCard = ({ badge, badgeColor, title, rating, description, path = "#", isWideBadge = false, className = '' }: { badge: React.ReactNode, badgeColor: string, title: string, rating: number, description?: string, path?: string, isWideBadge?: boolean, className?: string }) => (
    <div className={`group relative rounded-3xl bg-white border border-slate-100 hover:border-primary/30 p-5 xs:p-6 sm:p-8 flex flex-col h-full shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_-10px_rgba(var(--primary),0.15)] transition-all duration-500 hover:-translate-y-2 cursor-pointer text-center z-10 ${className}`}>

      {/* Decorative Top Accent Line */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-slate-100 to-slate-100 group-hover:from-primary/80 group-hover:to-primary transition-all duration-500 rounded-t-3xl" />

      {/* Beautiful subtle ambient glow on hover */}
      <div className="absolute right-0 top-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Icon/Badge container with expanding halo */}
      <div className="flex justify-center mb-6 relative w-full pointer-events-none mt-2">
        <div className="relative group-hover:scale-105 transition-transform duration-500 flex justify-center items-center">
          <div className="absolute inset-0 bg-primary/5 rounded-full scale-50 opacity-0 group-hover:scale-[1.6] group-hover:opacity-100 transition-all duration-500 ease-out z-0" />
          <div className={`relative z-10 flex items-center justify-center drop-shadow-sm group-hover:drop-shadow-md transition-all ${isWideBadge ? 'w-[100%] max-w-[200px]' : 'h-[80px] sm:h-[92px]'}`}>
            {badge}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-start mb-6 z-20">
        <h3 className="text-lg sm:text-[1.3rem] font-extrabold text-navy mb-3 leading-snug group-hover:text-primary transition-colors duration-300">{title}</h3>
        {description && (
          <p className="text-slate-600 text-[13px] sm:text-[14px] leading-[1.6] font-medium px-1 group-hover:text-slate-700 transition-colors duration-300">{description}</p>
        )}
      </div>

      <div className="flex flex-col gap-3.5 mt-auto relative z-20 w-full">
        <a href="https://line.me/ti/p/@221vifhp" target="_blank" rel="noopener noreferrer" className="relative w-full overflow-hidden bg-navy text-white font-bold py-3.5 rounded-xl text-[13px] tracking-[0.1em] transition-all duration-500 border border-transparent shadow-sm hover:bg-primary group-hover:shadow-lg active:scale-95 flex items-center justify-center gap-2">
          <span>{t('BOOK FREE DEMO')}</span>
          <ChevronRight size={16} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
        </a>

        <Link to={path} className="w-full bg-transparent text-slate-500 font-bold text-[13px] flex items-center justify-center gap-1 transition-all hover:text-primary active:scale-95">
          {t('Explore Details')} <ChevronRight size={14} className="group-hover:translate-x-1 transition-all" />
        </Link>
      </div>
    </div>
  );

  return (
    <Layout>
      <MetaSEO 
        seo={pageData?.seo || { 
          metaTitle: 'Ivy Bridge - Elite Cambridge & IB Online Tutoring Bangkok', 
          metaDescription: 'Thailand\'s premier 1-on-1 online tutoring institution for Cambridge IGCSE, A Level, and IB programs. Expert educators, personalized learning.' 
        }} 
        defaultTitle="Ivy Bridge - Elite Cambridge & IB Online Tutoring" 
      />
      <section className="relative pt-0 md:pt-4 pb-14 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden min-h-[500px] flex flex-col justify-center">

        <div className="max-w-[1400px] mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center lg:items-start lg:pt-0 xl:pt-0 mb-2 lg:mb-4 w-full">

            {/* Left Content - Horizontal Video Container */}
            <div className="relative flex justify-center lg:justify-start order-2 lg:order-1 lg:col-span-7 relative group w-full lg:-ml-4 xl:-ml-6 lg:mt-0">


              <div className="w-full aspect-video bg-slate-900 rounded-[2rem] md:rounded-[3rem] relative overflow-hidden shadow-[0_40px_80px_-15px_rgba(var(--primary),0.5)] flex items-center justify-center group transform transition-transform duration-700 hover:scale-[1.01] border border-slate-800 z-10">
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="none"
                  poster="/homepage-hero-poster.jpg"
                  className="absolute inset-0 w-full h-full object-cover z-0"
                >
                  <source src="/homepage-hero.mp4" type="video/mp4" />
                </video>
                
                {/* Clear Overlay for Video Visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent z-0 pointer-events-none" />
              </div>
            </div>

            {/* Right Content - Top Text content */}
            <div className="text-navy order-1 lg:order-2 px-4 sm:px-0 lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left relative lg:pl-6 xl:pl-10">


              <h1 className="flex flex-col items-center lg:items-start text-navy uppercase leading-[1.1] md:leading-[1.0] font-extrabold tracking-tight md:tracking-[-0.04em] text-[1.3rem] xs:text-[1.6rem] sm:text-[2.8rem] lg:text-[2.8rem] xl:text-[3.5rem] 2xl:text-[4rem] mb-6 md:mb-8">
                <div className="flex flex-row flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-4">
                  <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                    <span className="text-slate-600">BANGKOK'S</span>
                    <div className="inline-flex items-center group">
                      {/* Subtle design accent - ambient glow */}
                      <div className="absolute -inset-2 bg-gradient-to-br from-primary/30 to-blue-600/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-60 transition-all duration-700" />

                      {/* Premium Glass Container */}
                      <div className="relative shrink-0 bg-white/80 backdrop-blur-md p-1 sm:p-1.5 rounded-[1rem] sm:rounded-[1.25rem] shadow-2xl border border-white/50 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 overflow-hidden">
                        <div className="relative overflow-hidden rounded-[0.5rem] sm:rounded-[0.75rem] shadow-inner border border-slate-200/50">
                          <img
                            src="https://flagcdn.com/w160/th.png"
                            alt="Thai Flag"
                            className="w-8 h-6 sm:w-14 sm:h-9 lg:w-16 lg:h-10 object-cover"
                            loading="lazy"
                            decoding="async"
                            width="80"
                            height="48"
                          />
                          {/* Glossy overlay effect */}
                          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20 pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap justify-center lg:justify-start items-center gap-x-2 sm:gap-x-4 mt-1">
                  <span className="text-[#5595D9] font-display italic normal-case tracking-normal first-letter:uppercase lowercase">Premier</span>
                  <span>ONLINE</span>
                </div>
                <div className="flex flex-wrap justify-center lg:justify-start items-center gap-x-2 sm:gap-x-4 mt-1">
                  <span>TUTORING</span>
                  <span>INSTITUTION</span>
                </div>
              </h1>

              <div className="relative w-full">
                <p className="text-[14px] xs:text-[15px] sm:text-[19px] text-slate-600 mb-6 md:mb-8 leading-relaxed font-medium">
                  {t('We offer private online live classes aligned with IGCSE, IB, SAT, GED, Singaporean, Canadian, and other international and national curriculums. Our online lessons are delivered by experienced educators with strong subject expertise and proven experience in online teaching, ensuring high-quality instruction without the need for travel.')}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Full-Width Content */}
          <div className="w-full flex flex-col items-center lg:items-start text-center lg:text-left px-4 sm:px-0 mt-8 lg:mt-0 z-20 relative">

            {/* Promotion Banner - Clickable Flyer Redesign */}

            <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch mb-8">
              {/* Message to Parents - takes 2 cols on lg */}
              <div className="lg:col-span-2 text-slate-600 border border-slate-200/50 bg-white/40 backdrop-blur-sm rounded-[2.5rem] p-5 xs:p-8 lg:p-12 shadow-[0_20px_50px_rgb(0,0,0,0.03)] relative text-left flex flex-col justify-center overflow-hidden group">
                {/* Subtle mesh gradient background */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-700 pointer-events-none" />

                <div className="mb-6 md:mb-8 relative z-10">
                  <h4 className="text-[1.75rem] md:text-[2.5rem] font-black text-navy tracking-tight leading-none inline-block relative italic">
                    {t('Why our approach works')}
                    <div className="absolute -bottom-3 md:-bottom-4 left-0 w-16 md:w-24 h-1.5 md:h-2 bg-gradient-to-r from-primary to-navy rounded-full" />
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center relative z-10">
                  <div className="md:col-span-12">
                    <p className="text-[16px] md:text-[18px] leading-relaxed text-slate-900 font-bold italic mb-4">
                      {t('“Two-way communication –live classes, enabling students to ask questions in real time, with lessons personalized for each student to achieve the best results”')}
                    </p>
                    <p className="text-[15px] md:text-[17px] leading-relaxed text-slate-800 font-medium mb-0 pr-2">
                      {t('Many parents worry that online lessons are less effective than in-person teaching. In reality, with experienced online teachers and one-to-one live classes, students can ask questions in real time and receive fully personalized instruction. This focused approach allows teachers to give their full attention, making learning more efficient and consistent. With less time spent on travel and logistics, students are less tired and better able to focus—often achieving results that match or exceed traditional in-person tuition.')}
                    </p>
                  </div>
                </div>
              </div>
              {/* Action card - Simplified to only show the button */}
              <div className="p-4 md:p-8 flex flex-col items-center justify-center text-center relative overflow-hidden h-full group">

                <a href="https://line.me/ti/p/@221vifhp" target="_blank" rel="noopener noreferrer" className="w-full relative inline-flex items-center justify-center overflow-hidden bg-gradient-to-r from-[#5E9AF0] to-[#4285F4] text-white px-6 py-5 md:px-8 md:py-6 rounded-[2rem] font-black text-[1.35rem] md:text-2xl transition-all shadow-2xl hover:shadow-[#4285F4]/40 hover:-translate-y-1.5 active:scale-95 z-10 group/btn border border-white/20">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                  <span className="relative flex items-center gap-2 md:gap-3">
                    {t('Book a Free Trial Class')}
                    <ChevronRight size={24} className="group-hover/btn:translate-x-1.5 transition-transform duration-300 w-5 h-5 md:w-6 md:h-6" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* Benefits Section */}
      <section className="py-8 md:py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-[2rem] sm:text-4xl md:text-[3.5rem] font-extrabold text-navy/90 mb-8 md:mb-16 leading-[1.15] md:leading-[1.1]">
            {t('What Makes')} <br className="block" />
            <span className="inline-block bg-primary text-white px-4 py-1.5 md:px-6 md:py-2 rounded-xl md:rounded-2xl mt-2 transform -rotate-1 shadow-[0_0_20px_hsl(var(--primary)/0.6)]">{t('Us Different')}</span>
          </h2>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-x-16 md:gap-y-14 mt-12 md:mt-20">
            {[
              { icon: Play, title: t('Recorded Lessons'), desc: t('Students can revisit every lesson to reinforce learning.') },
              { icon: Library, title: t('Organized Learning Materials'), desc: t('Notes and resources are uploaded to each student’s folder after every class.') },
              { icon: Award, title: t('Experienced Teachers'), desc: t('Our teachers go through a strict selection process to ensure the highest teaching quality.') },
              { icon: Globe, title: t('Learn From Anywhere'), desc: t('Attend classes from the comfort of your home from anywhere in the world.') },
              { icon: User, title: t('Personalized Learning'), desc: t("Lessons are tailored to match each student's learning pace.") },
              { icon: Lightbulb, title: t('Concept-Based Teaching'), desc: t('We focus on understanding concepts deeply, not memorization.') }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 md:gap-6 group items-start">
                <div className="shrink-0 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                  <item.icon strokeWidth={2.5} className="drop-shadow-sm w-10 h-10 md:w-14 md:h-14" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-extrabold text-[#2a3b4c] mb-1.5 md:mb-2 leading-snug tracking-tight">{item.title}</h3>
                  <p className="text-[#5a6b7c] leading-relaxed text-[14px] md:text-base font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Offered Section */}
      <section ref={programsRef} className="py-10 md:py-32 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">

          <div className={`max-w-4xl mx-auto mb-10 md:mb-16 px-4 transition-all duration-1000 ${isProgramsVisible ? 'animate-in fade-in slide-in-from-top-12' : 'opacity-0'}`}>
            <div className="flex flex-col items-center">
              <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-[6rem] font-black text-navy tracking-tight leading-none uppercase">
                {t('Academic')}
              </h2>
              <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-[6rem] font-black text-[#5595D9] tracking-tight leading-none uppercase mt-1 md:-mt-2">
                {t('Programs')}
              </h2>
              <div className="w-16 md:w-24 h-1 bg-[#5595D9]/20 mt-6 md:mt-10 rounded-full" />
            </div>
          </div>

          {/* Tab Switcher - 3 equal columns on mobile, pill shape on desktop */}
          <div className={`w-full sm:w-auto sm:inline-flex p-1.5 bg-white border border-slate-200 shadow-sm rounded-2xl sm:rounded-full mb-16 md:mb-24 transition-all duration-1000 delay-200 ${isProgramsVisible ? 'animate-in fade-in slide-in-from-top-12' : 'opacity-0'}`}>
            <div className="grid grid-cols-3 sm:flex gap-1 w-full sm:w-auto">
              {(['Cambridge', 'IB', 'International'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-2 sm:px-8 lg:px-10 py-2.5 sm:py-3.5 rounded-xl sm:rounded-full font-black text-[11px] sm:text-sm transition-all duration-500 text-center ${activeCategory === cat
                    ? 'bg-primary text-white shadow-lg'
                    : 'text-slate-500 hover:text-navy'
                    }`}
                >
                  {cat === 'IB' ? 'IB Programs' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Category Header - Corrected Brand Colors & Rotation */}
          <div className={`mb-12 md:mb-20 max-w-4xl mx-auto transition-all duration-1000 delay-300 ${isProgramsVisible ? 'animate-in fade-in slide-in-from-top-20' : 'opacity-0'}`}>
            <div className="flex flex-col items-center">
              <h3 className="text-2xl sm:text-4xl md:text-[3.5rem] font-extrabold text-[#3a4a6a] mb-6 md:mb-10 tracking-tight leading-[1.5] md:leading-tight text-center">
                <span className="inline-block mr-1 sm:mr-2 md:mr-3 align-middle">{t('Our')}</span>
                <span className={`
                  bg-[#5595D9] ${activeCategory === 'Cambridge' ? '-rotate-2' : activeCategory === 'IB' ? 'rotate-2' : '-rotate-1'}
                  text-white px-4 py-1.5 sm:px-8 sm:py-2 rounded-xl sm:rounded-2xl inline-block mx-1 sm:mx-3 shadow-[0_12px_30px_rgba(0,0,0,0.1)] transform transition-all duration-500 align-middle mb-1 md:mb-0
                `}>{activeCategory === 'IB' ? 'IB' : activeCategory}</span>
                <span className="inline-block ml-1 sm:ml-2 md:ml-3 align-middle">{t('Programs')}</span>
              </h3>
            </div>

            <p className="text-slate-600 font-medium text-base md:text-[1.1rem] leading-[1.8] px-2 text-center max-w-3xl mx-auto">
              {activeCategory === 'Cambridge' && t("Ivy Bridge can be rescheduled consistent with students' availability. All students are provided with a free demo. Our programs are versatile and flexible, giving schools the opportunity to create an exciting and relevant curriculum. Cambridge Pathway students gain the knowledge and skills they need in school, college and beyond.")}
              {activeCategory === 'IB' && t('The International Baccalaureate organization gives four high-quality and challenging instructional programmes for an international community of schools, aiming to create a better, more peaceful world. At Ivy Bridge, our IB tutors help students develop inquiring, knowledgeable, and caring mindsets through personalized 1-on-1 coaching.')}
              {activeCategory === 'International' && t('In addition to Cambridge and IB, we provide expert 1-on-1 support for world-renowned boards including Indian (CBSE), Canadian and Singaporean Curriculums. Our global panel of certified tutors ensures that every student, regardless of their curriculum, receives personalized instruction to master their specific academic requirements.')}
            </p>
          </div>

          {/* Grid of Subjects */}
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 delay-500 ${isProgramsVisible ? 'animate-in fade-in slide-in-from-top-32' : 'opacity-0'}`}>
            {activeCategory === 'Cambridge' && (
              <>
                <ProgramCard
                  title="Cambridge IGCSE"
                  description={t("Build a strong academic foundation with a universally recognized curriculum tailored for success.")}
                  badge={<img src="/cambridge-logo.png" alt="Cambridge IGCSE" className="w-[85%] h-[85%] object-contain" />}
                  badgeColor="bg-white"
                  rating={4.8}
                  path="/cambridge/igcse"
                />
                <ProgramCard
                  title="Cambridge O Level"
                  description={t("Develop comprehensive knowledge and critical thinking skills for real-world application.")}
                  badge={<img src="/cambridge-logo.png" alt="Cambridge O Level" className="w-[85%] h-[85%] object-contain" />}
                  badgeColor="bg-white"
                  rating={4.8}
                  path="/cambridge/o-level"
                />
                <ProgramCard
                  title="Cambridge AS Level"
                  description={t("Engage with rigorous subjects to prepare yourself for higher academic achievement.")}
                  badge={<img src="/cambridge-logo.png" alt="Cambridge AS Level" className="w-[85%] h-[85%] object-contain" />}
                  badgeColor="bg-white"
                  rating={4.8}
                  path="/cambridge/as-level"
                />
                <ProgramCard
                  title="Cambridge A Level"
                  description={t("Achieve absolute academic excellence to unlock your admission to the world's top universities.")}
                  badge={<img src="/cambridge-logo.png" alt="Cambridge A Level" className="w-[85%] h-[85%] object-contain" />}
                  badgeColor="bg-white"
                  rating={4.8}
                  path="/cambridge/a-level"
                  className="md:col-start-2"
                />
              </>
            )}

            {activeCategory === 'IB' && (
              <>
                <ProgramCard
                  title="Primary Years Programme"
                  description={t("Nurture your curiosity and develop a lifelong foundation for active learning.")}
                  badge={<img src="/ib-pyp.png" alt="PYP" className="w-full h-full object-contain" />}
                  badgeColor="bg-transparent"
                  rating={4.8}
                  isWideBadge={true}
                  path="/ib/primary-years"
                />
                <ProgramCard
                  title="Middle Years Programme"
                  description={t("Empower your studies with practical connections to the real world through global contexts.")}
                  badge={<img src="/ib-myp.png" alt="MYP" className="w-full h-full object-contain" />}
                  badgeColor="bg-transparent"
                  rating={4.8}
                  isWideBadge={true}
                  path="/ib/middle-years"
                />
                <ProgramCard
                  title="IB Diploma Programme"
                  description={t("Prepare dynamically for success in higher education and life within a growing global society.")}
                  badge={<img src="/ib-dp.png" alt="IBDP" className="w-full h-full object-contain" />}
                  badgeColor="bg-transparent"
                  rating={4.8}
                  isWideBadge={true}
                  path="/ib/diploma"
                />
              </>
            )}

            {activeCategory === 'International' && (
              <>
                <ProgramCard
                  title="Indian (CBSE)"
                  description={t("Excel in worldwide standards with continuous and comprehensive evaluation methodologies.")}
                  badge={<img src="/cbse-logo.png" alt="CBSE" className="w-full h-full object-contain p-2" />}
                  badgeColor="bg-white"
                  rating={4.8}
                  path="https://line.me/ti/p/@221vifhp"
                />
                <ProgramCard
                  title="Canadian Curriculum"
                  description="Global academic excellence following the world-class Canadian education standards."
                  badge={<img src="/canada-logo.png" alt="Canadian" className="w-full h-full object-contain p-2" />}
                  badgeColor="bg-white"
                  rating={4.8}
                  path="https://line.me/ti/p/@221vifhp"
                />
                <ProgramCard
                  title="Singaporean Curriculum"
                  description="Master world-leading Mathematics and Science standards with specialized mentors."
                  badge={<img src="/singapore-logo.png" alt="Singaporean" className="w-full h-full object-contain p-2" />}
                  badgeColor="bg-white"
                  rating={4.9}
                  path="https://line.me/ti/p/@221vifhp"
                />
              </>
            )}
          </div>

        </div>
      </section>


      {/* Final CTA / Contact Form Section */}
      <section className="py-4 md:py-16 bg-white relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="bg-navy rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row items-stretch">

            {/* Left Content - Info */}
            <div className="lg:w-[40%] bg-navy p-5 xs:p-10 md:p-14 text-white flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/5 relative overflow-hidden">
              {/* Ambient glow */}
              <div className="absolute -top-8 md:p-16 -left-16 w-72 h-72 bg-primary/20 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />

              <div className="relative z-10">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-4 lg:mb-6">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-200">{t('Limited Slots Available')}</span>
                </div>

                {/* Heading */}
                <h2 className="font-black leading-none mb-6 flex flex-wrap items-center gap-x-3 sm:gap-x-4">
                  <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight">{t('FREE')}</span>
                  <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary tracking-tight">{t('Demo')}</span>
                </h2>

                {/* Contact rows */}
                <div className="space-y-5">
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/15 group-hover:bg-primary/30 transition-colors shrink-0">
                      <Mail size={20} className="text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] font-black text-blue-300 uppercase tracking-[0.2em] mb-0.5">{t('Email Us')}</div>
                      <div className="font-bold text-[13px] sm:text-base text-white/90 truncate">contact@ivybridgestudy.com</div>
                    </div>
                  </div>

                  <a href="https://line.me/ti/p/@221vifhp" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center overflow-hidden shrink-0 shadow-sm border border-slate-100 group-hover:shadow-md transition-all">
                      <img src="/line-logo.png" alt="LINE Official" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-blue-300 uppercase tracking-[0.2em] mb-0.5">{t('Connect with us')}</div>
                      <div className="font-bold text-sm sm:text-base text-[#06C755]">LINE Official</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>


            {/* Right Content - Contact Form */}
            <div className="flex-1 bg-white p-6 md:p-12 lg:p-8 md:p-16">
              <div className="max-w-xl mx-auto">
                <h3 className="text-3xl font-black text-navy mb-10 text-left">{t('Contact Us')}</h3>
                
                {submitted ? (
                  <div className="bg-primary/10 p-8 rounded-3xl text-center animate-in fade-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
                      <CheckCircle2 size={40} />
                    </div>
                    <h4 className="text-2xl font-black text-navy mb-4">{t('Thanks! We will')}</h4>
                    <p className="text-slate-600 font-medium">{t('get back to you within 24 hours.')}</p>
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="mt-8 text-primary font-black uppercase tracking-widest text-sm hover:underline"
                    >
                      {t('Send another message')}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2 text-left">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{t('NAME')}</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder={t('John Doe')}
                          required
                          className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all font-medium"
                        />
                      </div>
                      <div className="space-y-2 text-left">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{t('PHONE')}</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder={t('+1 (555) 000-0000')}
                          required
                          className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all font-medium"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 text-left">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{t('EMAIL')}</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t('john@example.com')}
                        required
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all font-medium"
                      />
                    </div>


                    <button
                      type="submit"
                      className="w-full py-6 bg-navy hover:bg-slate-900 text-white rounded-3xl font-black text-xl uppercase tracking-[0.2em] transition-all shadow-xl hover:shadow-navy/20 flex items-center justify-center gap-3 group"
                    >
                      {t('SEND MESSAGE')}
                      <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section >


    </Layout>
  );
}
