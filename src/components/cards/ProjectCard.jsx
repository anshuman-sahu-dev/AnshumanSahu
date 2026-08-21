import React, { useRef, useState } from 'react';
import { ScrollRevealWrapper } from '../UI/ScrollRevealWrapper';

export const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const [style, setStyle] = useState({});

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    
    setStyle({
      transform: `perspective(900px) rotateX(${-y * 6}deg) rotateY(${x * 8}deg) translateY(-8px) scale(1.02)`,
      '--gx': `${(x + 0.5) * 100}%`,
      '--gy': `${(y + 0.5) * 100}%`
    });
  };

  const handleMouseLeave = () => {
    setStyle({});
  };

  const isEven = index % 2 !== 0;

  return (
    <ScrollRevealWrapper className={`grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-[50px] items-center ${isEven ? 'md:[direction:rtl]' : ''}`}>
      <a 
        className={`relative block bg-white border border-black/12 p-[14px] shadow-[0_14px_30px_rgba(28,24,20,0.2)] transition-all duration-250 z-1 hover:z-4 hover:shadow-[0_26px_50px_rgba(255,107,26,0.3)] group ${isEven ? 'md:[direction:ltr] rotate-[1.6deg] hover:rotate-0' : 'rotate-[-1.6deg] hover:rotate-0'}`}
        href={project.link} 
        target="_blank" 
        rel="noopener noreferrer"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={style}
      >
        <span className="tape top-[-14px] left-[40px] -rotate-5"></span>
        <span className="tape top-[-14px] right-[40px] rotate-5"></span>
        <img src={project.image} alt={project.title} className="w-full block" />
        
        <div className="absolute inset-[14px] opacity-0 transition-opacity duration-250 pointer-events-none group-hover:opacity-100"
             style={{ background: 'radial-gradient(circle at var(--gx, 50%) var(--gy, 50%), rgba(255, 255, 255, 0.25) 0%, transparent 55%)' }}>
        </div>
        
        <span className="absolute inset-[14px] flex items-center justify-center bg-ink/72 opacity-0 transition-opacity duration-250 font-display font-black text-yellow dark:text-[#4b3621] text-[26px] uppercase tracking-[0.06em] z-2 group-hover:opacity-100">
          {project.id === 2 || project.id === 4 ? 'Open Project ↗' : 'View Project ↗'}
        </span>
      </a>

      <div className={`proj-info ${isEven ? 'md:[direction:ltr]' : ''}`}>
        <div className="font-display font-black text-[64px] text-transparent leading-none" style={{ WebkitTextStroke: '3px var(--color-ink)' }}>
          {String(project.id).padStart(2, '0')}
        </div>
        <h3 className="font-display font-black uppercase text-[clamp(28px,3.4vw,44px)] mt-2.5 mb-1 leading-[0.98]">
          {project.title}
        </h3>
        <div className="text-[12px] uppercase tracking-[0.14em] font-bold text-orange">
          {project.type}
        </div>
        <p className="text-[15.5px] leading-[1.65] mt-4 max-w-[430px]" dangerouslySetInnerHTML={{ __html: project.description }} />
        
        <div className="flex flex-wrap gap-[6px] mt-[18px]">
          {project.tags.map((tag, i) => {
            const t = tag.toLowerCase();
            let bgColor = 'bg-peach text-ink';
            if (t.includes('node')) bgColor = 'bg-green text-white';
            else if (t.includes('java')) bgColor = 'bg-yellow text-ink';
            else if (t.includes('react')) bgColor = 'bg-[#61dafb] text-ink';
            else if (t.includes('tailwind')) bgColor = 'bg-[#38bdf8] text-ink';
            else if (t.includes('github') || t.includes('vercel')) bgColor = 'bg-black text-white';
            else if (t.includes('laravel')) bgColor = 'bg-[#ff2d20] text-white';
            else if (t.includes('php')) bgColor = 'bg-[#777bb4] text-white';
            else if (t.includes('mysql')) bgColor = 'bg-orange text-white';

            const rotations = ['rotate-[1deg]', 'rotate-[1.4deg]', '-rotate-2', '-rotate-1'];
            const rot = rotations[i % 4];

            return (
              <span key={i} className={`px-[10px] py-1 font-bold text-[10px] whitespace-nowrap uppercase tracking-[0.06em] border-2 border-ink ${bgColor} ${rot}`}>
                {tag}
              </span>
            );
          })}
        </div>

        <a className="font-marker font-bold text-[19px] text-green inline-block mt-[15px] -rotate-[1.5deg] hover:text-orange" href={project.link} target="_blank" rel="noopener noreferrer">
          → explore the project!
        </a>
      </div>
    </ScrollRevealWrapper>
  );
};
