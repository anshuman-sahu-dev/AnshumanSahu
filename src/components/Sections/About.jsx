import React from 'react';
import { SectionHeading } from '../UI/SectionHeading';
import { ScrollRevealWrapper } from '../UI/ScrollRevealWrapper';
import profileImg from '../../assets/Profile/Anshuman Sahu.png';

export const About = () => {
  return (
    <section id="about" className="bg-paper-2 border-y-3 border-ink py-[90px]">
      <div className="wrap">
        <SectionHeading 
          titleLines={["About", "Me"]} 
          subtitle="the human behind the pixels" 
        />
        
        <ScrollRevealWrapper className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-[50px] items-start mt-[40px]">
          <div className="relative bg-white border border-black/12 p-[12px_12px_14px] shadow-[0_12px_26px_rgba(28,24,20,0.2)] rotate-2 transition-transform duration-250 hover:rotate-0 hover:scale-105 mx-auto md:mx-0 w-[250px]">
            <span className="tape -top-[14px] left-1/2 -translate-x-1/2 -rotate-3"></span>
            <img src={profileImg} alt="Anshuman Sahu" className="w-full block" />
            <div className="font-marker font-bold text-[19px] mt-2 text-center">Anshuman — Odisha, india</div>
          </div>
          
          <div>
            <span className="font-marker text-[24px] font-bold text-orange -rotate-2 inline-block">hello! :)</span>
            <h3 className="font-display font-black uppercase text-[clamp(28px,4vw,40px)] leading-[1.1] mt-2 mb-6">I'm a full stack developer who fell in love with building for the web.</h3>
            
            <p className="text-[17px] leading-[1.65] mb-5">
              My work sits at the intersection of <strong>full-stack development, Java, and modern web technologies</strong>. I build scalable applications and responsive digital experiences, using AI as my co-builder to <span className="hl">turn ideas into polished, high-performing products faster</span> from concept and development to deployment.
            </p>
            
            <p className="text-[17px] leading-[1.65] mb-8">
              My goal is simple: <strong className="hl">to build useful, scalable, and meaningful products by combining strong engineering fundamentals with modern tools</strong>. I approach every project with curiosity, a desire to solve meaningful problems, and a commitment to quality whether I’m building clean backend systems, intuitive interfaces, or intelligent automations.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-[20px] border-t-2 border-dashed border-ink/15 pt-8">
              <div className="flex flex-col items-center text-center gap-1">
                <b className="font-display text-[34px] text-orange leading-none">3</b>
                <span className="font-marker text-[18px] opacity-80">Internships in <br/> AI/ML &amp; Web Design</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1">
                <b className="font-display text-[34px] text-[#8b5cf6] leading-none">15+</b>
                <span className="font-marker text-[18px] opacity-80">certifications &amp; <br/> badges</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1">
                <b className="font-display text-[34px] text-[#10b981] leading-none">2+</b>
                <span className="font-marker text-[18px] opacity-80">Research Paper <br/> publications</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1">
                <b className="font-display text-[34px] text-[#0ea5e9] leading-none">&lt;24h</b>
                <span className="font-marker text-[18px] opacity-80">reply time</span>
              </div>
            </div>
          </div>
        </ScrollRevealWrapper>
      </div>
    </section>
  );
};
