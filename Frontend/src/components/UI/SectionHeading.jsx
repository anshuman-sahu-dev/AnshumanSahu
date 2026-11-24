import React from 'react';
import { ScrollRevealWrapper } from './ScrollRevealWrapper';

export const SectionHeading = ({ titleLines, subtitle, className = '' }) => {
  return (
    <ScrollRevealWrapper className={`flex items-baseline gap-[22px] mb-[54px] flex-wrap ${className}`}>
      <h2 className="font-display font-black uppercase text-[clamp(36px,6vw,78px)] m-0 leading-[0.92]">
        {titleLines.map((line, idx) => (
          <React.Fragment key={idx}>
            {line}
            {idx < titleLines.length - 1 && <br />}
          </React.Fragment>
        ))}
      </h2>
      <span className="font-marker font-bold text-[18px] text-green -rotate-2">
        {subtitle}
      </span>
    </ScrollRevealWrapper>
  );
};
