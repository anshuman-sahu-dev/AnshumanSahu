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
import { Footer } from './components/Footer/Footer';
import { useInkTrail } from './hooks/useInkTrail';
import { useClickStamp } from './hooks/useClickStamp';

function App() {
  useInkTrail();
  useClickStamp();

  const [showBackTop, setShowBackTop] = useState(false);

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
      <Contact />
      
      <MarqueeBanner items={marquee4} direction="left" variant="ink" />
      
      <button 
        className={`fixed bottom-4 right-4 md:bottom-[30px] md:right-[30px] px-3 py-1 md:px-4 md:py-1.5 bg-yellow text-ink dark:text-[#4b3621] border-2 border-ink dark:border-[#1c1814] shadow-[4px_4px_0_var(--color-ink)] dark:shadow-[4px_4px_0_#000000] font-marker text-[16px] md:text-[20px] cursor-pointer z-50 transition-all duration-300 hover:bg-orange hover:shadow-[6px_6px_0_var(--color-ink)] dark:hover:shadow-[6px_6px_0_#000000] hover:-translate-y-1 -rotate-2 ${showBackTop ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none translate-y-5'}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        ↑ top
      </button>
      
      <Footer />
    </>
  );
}

export default App;
