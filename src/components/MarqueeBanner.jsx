import React from 'react';

export const MarqueeBanner = ({ items, direction = 'left', variant = 'ink' }) => {
  const variants = {
    ink: "bg-ink text-paper border-y-3 border-ink",
    orange: "bg-orange text-white border-b-3 border-ink",
    green: "bg-green text-white border-y-3 border-ink"
  };

  const animationClass = direction === 'left' ? 'animate-[mar-l_20s_linear_infinite]' : 'animate-[mar-r_24s_linear_infinite]';

  return (
    <div className={`overflow-hidden group ${variants[variant]}`}>
      <div className={`flex whitespace-nowrap w-max group-hover:[animation-duration:7s] ${animationClass}`}>
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="font-display font-black text-[22px] uppercase tracking-[0.08em] py-[11px]">
            {items.map((item, j) => (
              <React.Fragment key={j}>
                {item.text} <em className="not-italic text-yellow px-[18px]">{item.separator}</em>
              </React.Fragment>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
};
