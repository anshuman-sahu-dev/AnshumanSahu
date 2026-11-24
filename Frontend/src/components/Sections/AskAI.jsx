import React from 'react';
import { SectionHeading } from '../UI/SectionHeading';
import { ScrollRevealWrapper } from '../UI/ScrollRevealWrapper';
import { Button } from '../UI/Button';

export const AskAI = () => {
  const suggestions = [
    "What are Anshuman’s projects?",
    "What are his key skills?",
    "Tell me about his experience.",
    "What Java technologies does he know?",
    "How can I contact him?"
  ];

  return (
    <section id="ask-ai" className="bg-paper border-t-3 border-ink py-[90px] relative overflow-hidden">
      <div className="absolute top-[10%] right-[10%] w-[300px] h-[300px] bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.15)_0%,transparent_70%)] pointer-events-none -z-1"></div>
      
      <div className="wrap text-center">
        <ScrollRevealWrapper>
          <SectionHeading 
            titleLines={["Meet My", "AI Assistant"]} 
            subtitle="ask anything about my background" 
          />
        </ScrollRevealWrapper>

        <ScrollRevealWrapper delay={0.1}>
          <p className="text-[17px] max-w-[800px] mx-auto mt-6 mb-10 leading-[1.6]">
            Curious about my projects, skills, experience, education, or background? <br className="hidden sm:block" />
            <span className="hl">Ask my AI assistant directly!</span> It's trained on my complete professional history and is ready to answer your questions instantly.
          </p>
        </ScrollRevealWrapper>

        <ScrollRevealWrapper delay={0.2} className="flex flex-wrap justify-center gap-3 mb-12 max-w-[900px] mx-auto">
          {suggestions.map((suggestion, index) => {
            const rotations = ['rotate-1', '-rotate-1', 'rotate-2', '-rotate-2', 'rotate-0'];
            return (
              <a 
                key={index}
                href="https://www.honestify.me/anshumansahu"
                target="_blank"
                rel="noopener noreferrer"
                className={`px-4 py-2 border-2 border-ink bg-white dark:bg-[#7a839e] font-bold text-[13px] md:text-[15px] hover:bg-yellow dark:hover:bg-yellow hover:-translate-y-1 hover:shadow-[4px_4px_0_var(--color-ink)] dark:hover:shadow-[4px_4px_0_#000000] transition-all text-ink dark:text-black cursor-pointer no-underline ${rotations[index % rotations.length]}`}
              >
                "{suggestion}"
              </a>
            );
          })}
        </ScrollRevealWrapper>

        <ScrollRevealWrapper delay={0.3}>
          <Button 
            href="https://www.honestify.me/anshumansahu" 
            target="_blank" 
            rel="noopener noreferrer" 
            variant="primary" 
            className="bg-[#8b5cf6] text-white border-ink hover:bg-[#7c3aed] shadow-[8px_8px_0_var(--color-ink)] hover:shadow-[12px_12px_0_var(--color-ink)] dark:shadow-[8px_8px_0_#000000] dark:hover:shadow-[12px_12px_0_#000000]"
          >
            ✨ Chat with My AI
          </Button>
        </ScrollRevealWrapper>
      </div>
    </section>
  );
};
