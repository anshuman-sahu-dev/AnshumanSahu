import React from 'react';
import { ScrollRevealWrapper } from '../UI/ScrollRevealWrapper';

export const JobCard = ({ job, isEven }) => {
  return (
    <ScrollRevealWrapper className={`bg-white border-3 border-ink dark:border-[#1c1814] p-[28px_26px] relative transition-all duration-200 mb-[30px] hover:rotate-0 hover:-translate-y-1.5 hover:shadow-solid-hover shadow-solid ${isEven ? 'rotate-[0.7deg]' : '-rotate-[0.8deg]'}`}>
      <div className="font-marker font-bold text-[19px] text-orange">{job.period}</div>
      <h3 className="font-display font-black uppercase text-[21px] mt-1.5 mb-0.5 text-[#4b3621]">{job.title}</h3>
      <div className="text-[12.5px] uppercase tracking-[0.12em] font-bold text-green">{job.organization}</div>
      {job.cgpa && <div className="text-[12.5px] uppercase tracking-[0.12em] font-bold text-[#ffbb00]">{job.cgpa}</div>}
      <p className="text-[14.5px] leading-[1.65] mt-3 whitespace-pre-line text-[#4b3621]" dangerouslySetInnerHTML={{ __html: job.description }} />
      {job.stat && (
        <div className="mt-5 flex items-center gap-2">
          <span className="font-display font-black text-[32px] text-orange leading-none">{job.stat.value}</span>
          <span className="font-marker font-bold text-[15px] text-[#4b3621] pt-1">{job.stat.label}</span>
        </div>
      )}
    </ScrollRevealWrapper>
  );
};
