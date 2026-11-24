import React from 'react';
import { ScrollRevealWrapper } from '../UI/ScrollRevealWrapper';

export const TestimonialCard = ({ testimonial, index }) => {
  const hoverShadowClasses = [
    'hover:shadow-[10px_12px_0_#ff4103]',
    'hover:shadow-[10px_12px_0_#b6ff00]',
    'hover:shadow-[10px_12px_0_#fd1843]'
  ];
  const shadowClass = index !== undefined ? hoverShadowClasses[index % 3] : 'hover:shadow-solid-hover';

  return (
    <ScrollRevealWrapper className={`bg-white border-3 border-ink dark:border-[#1c1814] p-[32px_28px] relative shadow-solid mb-[26px] transition-all duration-200 hover:-translate-y-1.5 ${shadowClass}`}>
      <p className="font-medium text-[16.5px] leading-[1.65] m-0 mb-6 italic text-[#4b3621] opacity-90">
        "{testimonial.quote}"
      </p>
      <div className="flex items-center gap-[18px]">
        <img src={testimonial.avatar} alt={testimonial.name} className="w-[50px] h-[50px] rounded-full border-2 border-ink object-cover" />
        <div className="flex flex-col">
          <strong className="text-[15px] text-[#4b3621]">{testimonial.name}</strong>
          <span className="text-[13px] text-[#4b3621] opacity-80 mt-0.5">{testimonial.role}</span>
          <span className="text-[13px] text-[#4b3621] opacity-80">{testimonial.company}</span>
        </div>
      </div>
    </ScrollRevealWrapper>
  );
};
