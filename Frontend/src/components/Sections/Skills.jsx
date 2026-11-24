import React from 'react';
import { SectionHeading } from '../UI/SectionHeading';
import { ScrollRevealWrapper } from '../UI/ScrollRevealWrapper';
import { skillsData } from '../../data/portfolioData';

const brandColors = {
  "Java": { bg: "#f89820", text: "#000" },
  "JavaScript (ES6+)": { bg: "#f7df1e", text: "#000" },
  "TypeScript": { bg: "#3178c6", text: "#fff" },
  "SQL": { bg: "#00758F", text: "#fff" },
  "HTML5": { bg: "#e34f26", text: "#fff" },
  "CSS3": { bg: "#1572b6", text: "#fff" },
  "Spring Boot": { bg: "#6db33f", text: "#fff" },
  "Spring MVC": { bg: "#6db33f", text: "#fff" },
  "Spring Security": { bg: "#6db33f", text: "#fff" },
  "Node.js": { bg: "#339933", text: "#fff" },
  "Express.js": { bg: "#eeeeee", text: "#000" },
  "REST APIs": { bg: "#009688", text: "#fff" },
  "React.js": { bg: "#61dafb", text: "#000" },
  "Three.js": { bg: "#000000", text: "#fff" },
  "Bootstrap 5": { bg: "#7952b3", text: "#fff" },
  "Tailwind CSS": { bg: "#06b6d4", text: "#000" },
  "Responsive Design": { bg: "#ffb25e", text: "#000" },
  "MySQL": { bg: "#4479a1", text: "#fff" },
  "PostgreSQL": { bg: "#336791", text: "#fff" },
  "MongoDB": { bg: "#47a248", text: "#fff" },
  "Manual Testing": { bg: "#ffb25e", text: "#000" },
  "Postman": { bg: "#ff6c37", text: "#fff" },
  "Selenium": { bg: "#43b02a", text: "#fff" },
  "Jira": { bg: "#0052cc", text: "#fff" },
  "AWS": { bg: "#ff9900", text: "#000" },
  "Docker": { bg: "#2496ed", text: "#fff" },
  "Jenkins": { bg: "#d24939", text: "#fff" },
  "Git": { bg: "#f05032", text: "#fff" },
  "GitHub": { bg: "#181717", text: "#fff" },
  "Vercel": { bg: "#000000", text: "#fff" },
  "Netlify": { bg: "#00c7b7", text: "#000" },
  "OpenAI": { bg: "#412991", text: "#fff" },
  "Gemini": { bg: "#8e75b2", text: "#fff" },
  "Claude": { bg: "#d97757", text: "#fff" },
  "Ollama": { bg: "#000000", text: "#fff" },
  "Codex": { bg: "#0058a0", text: "#fff" },
  "OpenClaw": { bg: "#ff0000", text: "#fff" },
  "Copilot": { bg: "#565758", text: "#fff" },
  "VS Code": { bg: "#007acc", text: "#fff" },
  "Google Antigravity": { bg: "#4285F4", text: "#fff" },
  "Cursor AI": { bg: "#000000", text: "#fff" },
  "IntelliJ IDEA": { bg: "#000000", text: "#fff" },
  "DSA": { bg: "#8b5cf6", text: "#fff" },
  "OOP": { bg: "#ec4899", text: "#fff" },
  "DBMS": { bg: "#0284c7", text: "#fff" },
  "Operating Systems": { bg: "#10b981", text: "#fff" }
};

export const Skills = () => {
  return (
    <section id="skills" className="py-[90px]">
      <div className="wrap">
        <SectionHeading 
          titleLines={["My", "Toolbox"]} 
          subtitle="tools I build with ↓" 
        />
        
        {skillsData.map((section, index) => (
          <ScrollRevealWrapper key={index} className={`mt-${index > 7 ? '8' : '0'}`}>
            <span className="font-marker font-bold text-[18px] lowercase mb-3 block" style={{ color: section.color || 'var(--color-ink)' }}>
              {section.category}
            </span>
            <div className="flex flex-wrap gap-2.5 mb-7">
              {section.skills.map((skill, i) => {
                const colors = brandColors[skill] || { bg: "#ffffff", text: "var(--color-ink)" };
                return (
                    <span 
                      key={i} 
                      className={`font-display font-bold text-[12px] md:text-[15.5px] uppercase tracking-[0.03em] px-3 py-1.5 md:px-[18px] md:py-[10px] border-2 border-ink transition-all duration-200 hover:scale-105 hover:-translate-y-1 hover:shadow-[4px_4px_0_var(--color-ink)] md:hover:shadow-[6px_6px_0_var(--color-ink)] ${i % 2 === 0 ? '-rotate-1 hover:rotate-2' : 'rotate-1 hover:-rotate-1'}`}
                      style={{ backgroundColor: colors.bg, color: colors.text }}
                    >
                      {skill}
                    </span>
                );
              })}
            </div>
          </ScrollRevealWrapper>
        ))}
      </div>
    </section>
  );
};
