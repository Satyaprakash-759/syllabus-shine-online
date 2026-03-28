import React from 'react';
import { CheckCircle2, Award, BookOpen, GraduationCap, Star, Users, ArrowRight, Zap, Target } from 'lucide-react';

interface ContentSection {
  type: 'hero' | 'features' | 'subjects' | 'cta' | 'testimonials';
  title?: string;
  subtitle?: string;
  items?: any[];
  bgColor?: string;
  [key: string]: any;
}

interface PageBuilderProps {
  content?: ContentSection[];
}

export const PageBuilder: React.FC<PageBuilderProps> = ({ content }) => {
  if (!content || !Array.isArray(content)) return null;

  return (
    <div className="page-builder">
      {content.map((section, index) => {
        switch (section.type) {
          case 'hero':
            return (
              <section key={index} className="py-20 text-center bg-white">
                <div className="max-w-4xl mx-auto px-6">
                  <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-navy mb-6">{section.title}</h1>
                  <p className="text-xl text-slate-600 mb-8">{section.subtitle}</p>
                </div>
              </section>
            );

          case 'features':
            return (
              <section key={index} className={`py-16 ${section.bgColor || 'bg-slate-50'}`}>
                <div className="max-w-7xl mx-auto px-6">
                  {section.title && <h2 className="text-4xl font-black text-navy text-center mb-12">{section.title}</h2>}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {section.items?.map((item, i) => (
                      <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                          <CheckCircle2 size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-navy mb-4">{item.title}</h3>
                        <p className="text-slate-600">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );

          case 'subjects':
             return (
              <section key={index} className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                  {section.title && <h2 className="text-4xl font-black text-navy text-center mb-12">{section.title}</h2>}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {section.items?.map((group, i) => (
                      <div key={i} className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100">
                        <h3 className="text-2xl font-black text-navy mb-6">{group.name}</h3>
                        <div className="space-y-3">
                          {group.items?.map((item: string, j: number) => (
                            <div key={j} className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-slate-100 text-slate-700 font-bold">
                              <div className="w-2 h-2 rounded-full bg-primary" />
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );

          case 'cta':
            return (
              <section key={index} className="py-20 px-6">
                <div className="max-w-5xl mx-auto bg-navy rounded-[3rem] p-12 text-center text-white relative overflow-hidden">
                  <div className="relative z-10">
                    <h2 className="text-4xl md:text-3xl sm:text-4xl md:text-5xl font-black mb-6">{section.title || 'Start Your Journey'}</h2>
                    <p className="text-primary/80 text-lg mb-10 max-w-2xl mx-auto">{section.subtitle}</p>
                    <a href="https://line.me/ti/p/@221vifhp" className="inline-flex items-center gap-2 bg-white text-navy px-10 py-5 rounded-2xl font-black text-xl hover:bg-primary hover:text-white transition-all shadow-2xl">
                      {section.buttonText || 'Book Free Demo'}
                      <ArrowRight size={24} />
                    </a>
                  </div>
                </div>
              </section>
            );

          default:
            return null;
        }
      })}
    </div>
  );
};
