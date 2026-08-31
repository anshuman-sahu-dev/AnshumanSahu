import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Header/Navbar';
import { Hero } from './components/Hero/Hero';
import { MarqueeBanner } from './components/MarqueeBanner';
import { Work } from './components/Sections/Work';
import { DayJob } from './components/Sections/DayJob';
import { Skills } from './components/Sections/Skills';
import { About } from './components/Sections/About';
import { Testimonials } from './components/Sections/Testimonials';
import { Process } from './components/Sections/Process';
import { Contact } from './components/Sections/Contact';
import { AskAI } from './components/Sections/AskAI';
import { Footer } from './components/Footer/Footer';
import { useInkTrail } from './hooks/useInkTrail';
import { useClickStamp } from './hooks/useClickStamp';

function App() {
  useInkTrail();
  useClickStamp();

  const [showBackTop, setShowBackTop] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackTop(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const marquee1 = [
    { text: 'WEB DESIGN', separator: '★' },
    { text: 'FULL STACK DEVELOPMENT', separator: '★' },
    { text: 'JAVA DEVELOPMENT', separator: '★' },
    { text: 'GENERATIVE AI', separator: '★' }
  ];

  const marquee2 = [
    { text: 'Anshuman', separator: '✿' },
    { text: 'PORTFOLIO', separator: '✿' },
    { text: '2026', separator: '✿' },
    { text: 'MADE WITH TOO MUCH COFFEE', separator: '✿' }
  ];

  const marquee3 = [
    { text: 'AND NOW THE DAY JOB', separator: '★' },
    { text: 'FULL STACK · JAVA DEVELOPMENT · GENERATIVE AI', separator: '★' }
  ];

  const marquee4 = [
    { text: 'THANKS FOR SCROLLING', separator: '✿' },
    { text: 'Anshuman Sahu', separator: '✿' },
    { text: 'MAKE IT PERSONAL', separator: '✿' }
  ];

  return (
    <>
      <Navbar />
      <Hero />
      <MarqueeBanner items={marquee1} direction="left" variant="ink" />
      <MarqueeBanner items={marquee2} direction="right" variant="orange" />
      
      <Work />
      
      <MarqueeBanner items={marquee3} direction="right" variant="green" />
      
      <DayJob />
      <Skills />
      <About />
      <Testimonials />
      <Process />
      <AskAI />
      <Contact />
      
      <MarqueeBanner items={marquee4} direction="left" variant="ink" />
      
      <button 
        className={`fixed bottom-4 left-4 md:bottom-[30px] md:left-[30px] px-3 py-1 md:px-4 md:py-1.5 bg-yellow text-ink dark:text-[#4b3621] border-2 border-ink dark:border-[#1c1814] shadow-[4px_4px_0_var(--color-ink)] dark:shadow-[4px_4px_0_#000000] font-marker text-[16px] md:text-[20px] cursor-pointer z-50 transition-all duration-300 hover:bg-orange hover:shadow-[6px_6px_0_var(--color-ink)] dark:hover:shadow-[6px_6px_0_#000000] hover:-translate-y-1 -rotate-2 ${showBackTop ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none translate-y-5'}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        ↑ top
      </button>

      {isChatOpen && (
        <div className="fixed bottom-[60px] right-4 md:bottom-[80px] md:right-[30px] w-[360px] max-w-[calc(100vw-2rem)] h-[550px] max-h-[calc(100vh-220px)] bg-white dark:bg-[#1c1814] border-2 md:border-3 border-ink shadow-[8px_8px_0_var(--color-ink)] dark:shadow-[8px_8px_0_#000000] z-50 flex flex-col overflow-hidden animate-[pop-up_0.2s_ease-out_forwards] origin-bottom-right rounded-lg">
          <div className="bg-[#8b5cf6] text-white p-3 md:p-4 flex justify-between items-center border-b-2 border-ink shrink-0 z-10 relative">
            <span className="font-marker text-[18px] md:text-[20px] font-bold flex items-center gap-2">
              <span className="animate-pulse">🤖</span> Meet My AI
            </span>
            <button 
              onClick={() => setIsChatOpen(false)} 
              className="bg-transparent hover:bg-transparent hover:opacity-70 p-1 rounded transition-all cursor-pointer" 
              aria-label="Close chat"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          <div className="flex-1 w-full overflow-hidden relative bg-paper dark:bg-[#2a2520]">
            <iframe 
              src="https://www.honestify.me/anshumansahu" 
              className="absolute top-0 left-0 w-[calc(100%+26px)] h-full border-none no-scrollbar"
              title="Honestify AI Chat"
            />
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsChatOpen(!isChatOpen)}
        className={`fixed bottom-4 right-4 md:bottom-[30px] md:right-[30px] px-3 py-1.5 md:px-4 md:py-2 bg-[#8b5cf6] text-white border-2 border-ink dark:border-black shadow-[4px_4px_0_var(--color-ink)] dark:shadow-[4px_4px_0_#000000] font-marker text-[16px] md:text-[20px] cursor-pointer z-50 transition-all duration-300 hover:bg-[#7c3aed] hover:shadow-[6px_6px_0_var(--color-ink)] dark:hover:shadow-[6px_6px_0_#000000] hover:animate-none hover:-translate-y-1 hover:scale-105 animate-[zoom-in-out_2.5s_ease-in-out_infinite] flex items-center gap-2 ${isChatOpen ? 'opacity-0 pointer-events-none translate-y-5' : 'opacity-100'}`}
      >
        <span className="animate-pulse">🤖</span> Meet my AI
      </button>
      
      <Footer />
    </>
  );
}

export default App;
