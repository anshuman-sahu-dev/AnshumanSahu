import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Button = ({ children, variant = 'primary', className, ...props }) => {
  const baseClasses = "font-display uppercase border-3 transition-all duration-150 inline-flex items-center gap-2 cursor-pointer";
  
  const variants = {
    primary: "text-[19px] font-black bg-orange text-white px-[36px] py-[18px] border-ink shadow-[8px_8px_0_var(--color-ink)] hover:-translate-x-[3px] hover:-translate-y-[3px] hover:-rotate-1 hover:shadow-[12px_12px_0_var(--color-ink)] hover:bg-green hover:text-white",
    ghost: "text-[16px] font-black bg-transparent text-ink px-[30px] py-[17px] border-ink hover:bg-yellow hover:rotate-1"
  };

  return (
    <a
      className={twMerge(clsx(baseClasses, variants[variant], className))}
      {...props}
    >
      {children}
    </a>
  );
};
