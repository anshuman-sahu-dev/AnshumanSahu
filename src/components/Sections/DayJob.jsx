import React from 'react';
import { SectionHeading } from '../UI/SectionHeading';
import { JobCard } from '../cards/JobCard';
import { ScrollRevealWrapper } from '../UI/ScrollRevealWrapper';
import { experienceData, educationData, certificationsData } from '../../data/portfolioData';

export const DayJob = () => {
  return (
    <section id="dayjob" className="bg-paper-2 border-b-3 border-ink relative py-[90px]">
      <div className="wrap">
        <SectionHeading
          titleLines={["The Real", "Me, On Paper"]}
          subtitle="no fake titles here — this is what i actually do"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-[34px] items-start">
          <div>
            {experienceData.map((job, index) => (
              <JobCard key={job.id} job={job} isEven={index % 2 !== 0} />
            ))}
          </div>

          <div>
            <ScrollRevealWrapper className="bg-[#fff3b8] text-[#4b3621] p-[24px_22px] relative shadow-[0_10px_20px_rgba(28,24,20,0.16)] mb-[26px] -rotate-[1.2deg] transition-transform duration-200 hover:rotate-0 hover:scale-102">
              <span className="tape -top-[12px] left-[26px] w-[76px] rotate-4"></span>
              <h4 className="font-display font-bold uppercase text-[15px] m-0 mb-2.5 tracking-[0.04em]">Certifications</h4>
              <ul className="m-0 pl-[18px]">
                {certificationsData.map((cert, index) => (
                  <li key={index} className="text-[14px] leading-[1.6] mb-1" dangerouslySetInnerHTML={{ __html: cert }} />
                ))}
              </ul>
            </ScrollRevealWrapper>

            <ScrollRevealWrapper className="bg-[#d4f0de] text-[#4b3621] p-[24px_22px] relative shadow-[0_10px_20px_rgba(28,24,20,0.16)] mb-[26px] rotate-1 transition-transform duration-200 hover:rotate-0 hover:scale-102">
              <span className="tape -top-[12px] left-[26px] w-[76px] rotate-4"></span>
              <h4 className="font-display font-bold uppercase text-[15px] m-0 mb-2.5 tracking-[0.04em]">Why it matters for your website</h4>
              <ul className="m-0 pl-[18px]">
                <li className="text-[14px] leading-[1.6] mb-1"><strong>&bull;</strong> I build for <strong>performance and real-world impact</strong>, not just aesthetics every feature has a purpose</li>
                <li className="text-[14px] leading-[1.6] mb-1"><strong>&bull;</strong> I combine <strong>full-stack development, Java, and modern web technologies</strong> to create scalable digital experiences</li>
                <li className="text-[14px] leading-[1.6] mb-1"><strong>&bull;</strong> Generative AI is my co-builder helping me <strong>design, develop, test, and ship</strong> high-quality products faster</li>
              </ul>
            </ScrollRevealWrapper>

            <ScrollRevealWrapper className="text-center mt-2 mb-9">
              <a href="https://www.linkedin.com/in/anshuman-sahu-371a6535b/" target="_blank" rel="noopener noreferrer" className="font-display font-bold text-[16px] uppercase bg-transparent text-ink px-[30px] py-[17px] border-3 border-ink transition-all duration-150 inline-block hover:bg-linkedin hover:text-white hover:rotate-1">
                Full story on LinkedIn ↗
              </a>
            </ScrollRevealWrapper>

            {educationData.map((edu, index) => (
              <ScrollRevealWrapper key={edu.id} className={`bg-[#e7f0ff] border-3 border-dashed border-ink dark:border-[#1c1814] p-[24px_22px] relative shadow-[6px_6px_0_rgba(28,24,20,0.15)] mb-[26px] transition-all duration-200 hover:rotate-0 hover:-translate-y-1.5 hover:shadow-[10px_10px_0_var(--color-peach)] ${index % 2 !== 0 ? 'bg-[#ffeafa] rotate-[0.9deg]' : '-rotate-[0.8deg]'}`}>
                <div className="font-marker font-bold text-[17px]" style={{ color: index === 0 ? '#027373' : '#ff0d00' }}>{edu.period}</div>
                <h3 className="font-display font-bold uppercase text-[21px] mt-1.5 mb-0.5" style={{ color: index === 0 ? '#025940' : '#fea604' }}>{edu.title}</h3>
                <div className="text-[12.5px] uppercase tracking-[0.12em] font-bold" style={{ color: index === 0 ? '#d47714' : '#4d6801' }}>{edu.organization}</div>
                <p className="m-0 mt-3"><span className="font-display font-black text-[30px]" style={{ color: index === 0 ? '#193193' : '#8b5cf6' }}>{edu.score}</span></p>
              </ScrollRevealWrapper>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
