import React from 'react';
import { SectionHeading } from '../UI/SectionHeading';
import { ScrollRevealWrapper } from '../UI/ScrollRevealWrapper';
import { processData } from '../../data/portfolioData';

export const Process = () => {
  return (
    <section className="py-[90px]">
      <div className="wrap">
        <SectionHeading 
          titleLines={["How I", "Build"]} 
          subtitle="plan. code. ship. ☕" 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px] mt-[50px]">
          {processData.map((proc, index) => {
            const hoverShadowClasses = [
              'hover:shadow-[10px_12px_0_#fd0d02]', 
              'hover:shadow-[10px_12px_0_#fea603]', 
              'hover:shadow-[10px_12px_0_#4d6802]'
            ];
            const textColors = ['text-[#fd0d02]', 'text-[#fea603]', 'text-[#4d6802]'];
            
            return (
              <ScrollRevealWrapper 
                key={proc.id} 
                className={`bg-white border-3 border-ink dark:border-[#1c1814] p-[32px_28px] relative shadow-solid transition-all duration-200 hover:-translate-y-1.5 ${hoverShadowClasses[index % 3]}`}
              >
                <div className={`font-marker font-bold text-[38px] leading-none mb-4 ${textColors[index % 3]}`}>
                  {proc.id}.
                </div>
                <h3 className="font-display font-black uppercase text-[19px] mb-3 tracking-[0.02em] text-[#4b3621]">{proc.title}</h3>
                <p className="text-[14.5px] leading-[1.65] text-[#4b3621]" dangerouslySetInnerHTML={{ __html: proc.description }} />
              </ScrollRevealWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
};
