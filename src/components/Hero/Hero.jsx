import React from 'react';
import { Button } from '../UI/Button';
import profileImg from '../../assets/Profile/Anshuman Sahu.png';

export const Hero = () => {
  return (
    <header className="relative pt-[90px] pb-[70px] overflow-hidden" id="top">
      <div className="absolute right-[-3%] top-0 font-display text-[24vw] leading-[0.85] text-transparent pointer-events-none select-none animate-[drift_15s_ease-in-out_infinite]" style={{ WebkitTextStroke: '2px rgba(255, 107, 26, 0.13)' }}>
        HELLO
      </div>
      
      <div className="wrap relative">
        <span className="font-marker text-[17px] text-green -rotate-2 inline-block font-bold">
          ↓ hi! i'm Anshuman — Developer by profession, Builder by heart ↓
        </span>
        
        <h1 className="font-display font-black uppercase mt-1.5 text-[clamp(42px,7.3vw,110px)] leading-[0.95] tracking-[-0.01em]">
          <span className="block overflow-hidden"><span className="inline-block animate-slam">CODE IN.</span></span>
          <span className="block overflow-hidden"><span className="inline-block animate-slam-delay-1"><span className="text-transparent" style={{ WebkitTextStroke: '3px var(--color-ink)' }}>BUILD</span> OUT.</span></span>
          <span className="block overflow-hidden">
            <span className="inline-block animate-slam-delay-2">
              <span className="text-green relative inline-block whitespace-nowrap">ALWAYS HONEST.
                <svg className="absolute -left-[6%] -top-[12%] w-[112%] h-[128%] overflow-visible pointer-events-none" viewBox="0 0 640 150" fill="none" preserveAspectRatio="none">
                  <ellipse cx="320" cy="75" rx="308" ry="60" stroke="#FF6B1A" strokeWidth="5" strokeLinecap="round" transform="rotate(-1.5 320 75)" className="[stroke-dasharray:1200] [stroke-dashoffset:1200] [animation:draw_1.4s_ease_0.9s_forwards]"></ellipse>
                  <ellipse cx="318" cy="78" rx="298" ry="54" stroke="#FF6B1A" strokeWidth="3.5" strokeLinecap="round" transform="rotate(-3 318 78)" className="[stroke-dasharray:1200] [stroke-dashoffset:1200] [animation:draw_1.4s_ease_0.9s_forwards]"></ellipse>
                </svg>
              </span>
            </span>
          </span>
        </h1>

        <div className="absolute font-marker font-bold bg-yellow text-ink dark:bg-[#cc5500] dark:text-black px-2 py-1 md:px-3 md:py-1.5 rotate-6 border-2 md:border-3 border-ink shadow-[4px_4px_0_rgba(28,24,20,0.85)] text-[13px] md:text-[16px] z-5 animate-[wobble_5s_ease-in-out_infinite] -top-6 right-2 md:top-[-2px] md:right-[7%] cursor-default">
          open for projects ✌
        </div>

        <div className="inline-flex items-center gap-2 md:gap-3 mt-4 md:mt-[22px] flex-wrap">
          <span className="font-bold text-[10px] md:text-[12.5px] uppercase tracking-[0.1em] border-2 border-ink bg-white dark:bg-[#7a839e] dark:text-black px-3 py-1.5 md:px-[14px] md:py-[6px] -rotate-1">AI-Native Web Designer</span>
          <span className="font-bold text-[10px] md:text-[12.5px] uppercase tracking-[0.1em] border-2 border-ink bg-yellow dark:text-black px-3 py-1.5 md:px-[14px] md:py-[6px] rotate-[1.2deg]">Full Stack Developer</span>
          <span className="font-bold text-[10px] md:text-[12.5px] uppercase tracking-[0.1em] border-2 border-ink bg-[#c9ebd6] dark:bg-[#60997a] dark:text-black px-3 py-1.5 md:px-[14px] md:py-[6px] -rotate-[1.6deg]">B.Tech · Computer Science Engineering</span>
        </div>

        <div className="flex gap-6 md:gap-[40px] mt-6 md:mt-[26px] flex-col md:flex-row items-start">
          <p className="w-full md:max-w-[460px] text-[15px] md:text-[17px] leading-[1.6] m-0 font-medium">
            By profession, I build end-to-end software solutions from clean, intuitive user interfaces to robust backend systems. I blend engineering, problem-solving, and design to create <span className="hl">bold, functional websites and applications engineered to scale, perform, and deliver real-world impact</span>.
          </p>

          <div className="hidden md:flex flex-col items-start">
            <svg width="120" height="80" viewBox="0 0 120 80" fill="none" className="overflow-visible">
              <path d="M8 10 C 40 60, 70 66, 104 44" stroke="#23A05A" strokeWidth="4.5" strokeLinecap="round" fill="none" className="[stroke-dasharray:1200] [stroke-dashoffset:1200] animate-[draw_1.4s_ease_0.9s_forwards]"></path>
              <path d="M104 44 L 84 40 M104 44 L 96 62" stroke="#23A05A" strokeWidth="4.5" strokeLinecap="round" fill="none" className="[stroke-dasharray:1200] [stroke-dashoffset:1200] animate-[draw_1.4s_ease_0.9s_forwards]"></path>
            </svg>
            <span className="font-marker text-[18px] font-bold text-green rotate-3">scroll — the work speaks!</span>
          </div>
        </div>

        <div className="flex flex-col-reverse lg:flex-row justify-between items-start lg:items-end mt-12 lg:-mt-[190px] gap-12 lg:gap-0 relative z-10">
          <div className="flex gap-4 md:gap-[30px] flex-wrap w-full lg:w-auto justify-center lg:justify-start">
            <Button href="#work" variant="primary" className="w-full sm:w-auto text-center">See My Work</Button>
            <Button href="#contact" variant="ghost" className="w-full sm:w-auto text-center">Say Hello ↓</Button>
          </div>

          <div className="w-[180px] sm:w-[220px] lg:w-[280px] rotate-4 z-6 bg-white border border-black/12 p-[8px_8px_10px] md:p-[12px_12px_14px] shadow-[0_12px_26px_rgba(28,24,20,0.2)] transition-transform duration-250 hover:rotate-0 hover:scale-105 self-center lg:self-end">
            <span className="tape -top-[10px] md:-top-[14px] left-1/2 -translate-x-1/2 -rotate-3 scale-75 md:scale-100"></span>
            <img src={profileImg} alt="Anshuman Sahu" className="w-full block" />
            <div className="font-marker font-bold text-[16px] md:text-[19px] mt-2 text-center text-[#4b3621]">that's me :)</div>
          </div>
        </div>
      </div>
    </header>
  );
};
