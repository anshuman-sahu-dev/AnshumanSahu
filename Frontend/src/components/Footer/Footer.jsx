import React from 'react';
import { Briefcase, Building, User, Mail } from 'lucide-react';

const GithubIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

const LinkedinIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect width="4" height="12" x="2" y="9"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export const Footer = () => {
  return (
    <footer className="bg-ink text-paper py-8 border-t-[4px] border-orange">
      <div className="wrap flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4 text-center md:text-left">
        <div className="flex flex-wrap justify-center md:flex-row gap-6 md:gap-8">
          <a href="#work" className="flex flex-col items-center gap-1.5 text-paper opacity-80 hover:opacity-100 hover:text-yellow transition-colors text-[13px]">
            <Briefcase size={20} /> Work
          </a>
          <a href="#dayjob" className="flex flex-col items-center gap-1.5 text-paper opacity-80 hover:opacity-100 hover:text-yellow transition-colors text-[13px]">
            <Building size={20} /> Day Job
          </a>
          <a href="#about" className="flex flex-col items-center gap-1.5 text-paper opacity-80 hover:opacity-100 hover:text-yellow transition-colors text-[13px]">
            <User size={20} /> About
          </a>
          <a href="mailto:toanshumansahu@gmail.com" className="flex flex-col items-center gap-1.5 text-paper opacity-80 hover:opacity-100 hover:text-yellow transition-colors text-[13px]">
            <Mail size={20} /> Email
          </a>
          <a href="https://www.linkedin.com/in/anshuman-sahu-371a6535b/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1.5 text-paper opacity-80 hover:opacity-100 hover:text-yellow transition-colors text-[13px]">
            <LinkedinIcon size={20} /> LinkedIn
          </a>
          <a href="https://github.com/anshuman-sahu-dev" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1.5 text-paper opacity-80 hover:opacity-100 hover:text-yellow transition-colors text-[13px]">
            <GithubIcon size={20} /> GitHub
          </a>
        </div>

        <span className="font-marker font-bold text-[15px] md:text-[15px] text-orange -rotate-1">
          designed &amp; built by Anshuman Sahu — every pixel, every wiggle
        </span>

        <span className="text-[13px] md:text-[14px] font-bold text-paper/90">
          © 2026 WanderFramez_ 📸
        </span>
      </div>
    </footer>
  );
};
