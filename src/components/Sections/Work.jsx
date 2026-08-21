import React from 'react';
import { SectionHeading } from '../UI/SectionHeading';
import { ProjectCard } from '../cards/ProjectCard';
import { projectsData } from '../../data/portfolioData';

export const Work = () => {
  return (
    <section id="work" className="relative py-[90px]">
      <div className="wrap">
        <SectionHeading 
          titleLines={["Side Hustles", "I'm Proud Of"]} 
          subtitle="hover the photos → click to visit!" 
        />
        
        <div className="flex flex-col gap-[90px]">
          {projectsData.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
