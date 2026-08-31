import React, { useState } from 'react';
import { Button } from '../UI/Button';
import { ScrollRevealWrapper } from '../UI/ScrollRevealWrapper';
import { Download, Scissors } from 'lucide-react';

export const Contact = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('toanshumansahu@gmail.com').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  return (
    <section className="bg-paper border-t-3 border-ink py-[120px] relative overflow-hidden" id="contact">
      <div className="absolute top-[12%] left-1/2 -ml-[220px] w-[440px] h-[440px] bg-[radial-gradient(circle_at_center,rgba(255,107,26,0.15)_0%,transparent_70%)] pointer-events-none -z-1"></div>
      
      <div className="absolute bottom-4 left-2 md:bottom-[90px] md:left-[10%] font-marker font-bold bg-green text-white px-2 py-1 md:px-3 md:py-1.5 rotate-6 border-2 border-white shadow-[3px_3px_0_rgba(28,24,20,0.85)] dark:shadow-[3px_3px_0_#000000] text-[12px] md:text-[15px] z-5 animate-[wobble_5s_ease-in-out_infinite] [animation-delay:2s] hidden sm:block">
        your site could look this good
      </div>
      
      <a 
        href="assets/Anshuman Sahu Resume.pdf" 
        download
        className="absolute bottom-4 right-2 md:bottom-[90px] md:right-[10%] font-marker font-bold bg-orange text-white px-2 py-1 md:px-3 md:py-1.5 rotate-6 border-2 border-ink shadow-[3px_3px_0_rgba(28,24,20,0.85)] text-[12px] md:text-[15px] z-5 animate-[wobble_5s_ease-in-out_infinite] [animation-delay:2.5s] flex items-center gap-1.5 cursor-pointer no-underline flex-row-reverse hidden sm:flex"
      >
        <Download size={16} className="scale-75 md:scale-100" /> Download Resume
      </a>
      
      <div className="wrap text-center">
        <ScrollRevealWrapper>
          <div className="relative inline-block">
            <div className="absolute -top-[30px] right-0 md:-top-[45px] md:-right-[45px] font-marker font-bold bg-yellow text-ink px-2 py-1 md:px-3 md:py-1.5 rotate-[8deg] border-2 border-ink shadow-[3px_3px_0_rgba(28,24,20,0.85)] text-[12px] md:text-[14px] z-10 animate-[wobble_5s_ease-in-out_infinite] origin-bottom-right">
              replies fast, promise!
            </div>
            <h2 className="font-display font-black uppercase text-[clamp(50px,11vw,150px)] leading-[0.95] m-0 tracking-[-0.01em]">
              <span className="text-transparent" style={{ WebkitTextStroke: '2px var(--color-ink)' }}>LET'S MAKE</span><br/>
              <span className="text-orange">SOMETHING.</span>
            </h2>
          </div>
        </ScrollRevealWrapper>
        
        <ScrollRevealWrapper delay={0.1}>
          <p className="text-[17px] max-w-[1200px] w-full mx-auto mt-6 mb-10 leading-[1.6] lg:whitespace-nowrap">
            Have an idea worth building? Let's turn it into an intelligent, beautifully crafted digital experience, <span className="font-marker font-bold text-[20px] text-green -rotate-1 inline-block">from first concept to launch.</span>
          </p>
        </ScrollRevealWrapper>
        
        <ScrollRevealWrapper delay={0.2} className="flex justify-center gap-4 flex-wrap mt-8">
          <Button href="mailto:toanshumansahu@gmail.com" variant="primary" className="bg-[#4b3621] text-white border-[#4b3621] hover:bg-[#4b3621] hover:text-white shadow-[6px_6px_0_var(--color-orange)] hover:shadow-[10px_10px_0_var(--color-orange)]">EMAIL ME</Button>
          <Button href="https://www.honestify.me/anshumansahu" target="_blank" rel="noopener noreferrer" variant="ghost" className="bg-transparent border-ink hover:bg-[#8b5cf6] hover:text-white text-ink transition-all hover:-translate-x-[3px] hover:-translate-y-[3px] hover:-rotate-1 shadow-none">ASK MY AI 🤖</Button>
          <Button href="https://www.linkedin.com/in/anshuman-sahu-371a6535b/" target="_blank" rel="noopener noreferrer" variant="ghost" className="bg-transparent border-ink hover:bg-[#0077b5] hover:text-white text-ink transition-all hover:-translate-x-[3px] hover:-translate-y-[3px] hover:-rotate-1 shadow-none">LINKEDIN ↗</Button>
          <Button href="https://github.com/anshuman-sahu-dev" target="_blank" rel="noopener noreferrer" variant="ghost" className="bg-transparent border-ink hover:bg-[#24292e] hover:text-white text-ink transition-all hover:-translate-x-[3px] hover:-translate-y-[3px] hover:-rotate-1 shadow-none">GITHUB ↗</Button>
        </ScrollRevealWrapper>
        
        <ScrollRevealWrapper delay={0.3} className="mt-12 flex justify-center">
          <button 
            type="button" 
            onClick={handleCopyEmail}
            className={`flex items-center gap-3 font-marker font-bold text-[16px] -rotate-2 bg-transparent border-2 border-dashed px-8 py-3 cursor-pointer transition-all hover:bg-yellow hover:-translate-y-1 hover:shadow-solid-hover ${copied ? 'text-green border-green' : 'text-ink border-ink'}`}
          >
            {copied ? (
              '✓ copied! now go paste it somewhere nice'
            ) : (
              <>
                <Scissors size={24} strokeWidth={2.5} /> or click to copy: toanshumansahu@gmail.com
              </>
            )}
          </button>
        </ScrollRevealWrapper>
      </div>
    </section>
  );
};
