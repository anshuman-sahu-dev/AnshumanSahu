import React, { useEffect, useState } from 'react';
import { Button } from '../UI/Button';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export const Navbar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = ['work', 'dayjob', 'skills', 'about'];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { href: '#work', label: 'Work' },
    { href: '#dayjob', label: 'Day Job' },
    { href: '#skills', label: 'Skills' },
    { href: '#about', label: 'About' },
  ];

  return (
    <nav className="sticky top-0 z-[100] bg-paper border-b-3 border-ink">
      <div 
        className="absolute left-0 -bottom-[3px] h-[3px] bg-gradient-to-r from-orange via-yellow to-green z-[101]"
        style={{ width: `${scrollProgress}%` }}
      ></div>
      <div className="flex items-center justify-between py-3 px-4 md:py-[14px] md:px-[28px] max-w-[1200px] mx-auto">
        <a href="#top" className="font-display text-[18px] md:text-[20px] text-ink flex items-center gap-[6px] md:gap-[10px]">
          <span className="w-[10px] h-[10px] md:w-[13px] md:h-[13px] bg-green rounded-full animate-[pulse-dot_1.6s_ease-in-out_infinite]"></span>
          <strong className="font-black text-[18px] md:text-[22px] tracking-wide">Anshuman&nbsp;Sahu</strong>
          <span className="font-marker text-[14px] md:text-[17px] text-orange -rotate-6 hidden sm:inline-block ml-0.5 font-bold">
            ai-native designer
          </span>
        </a>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-[26px]">
          {navLinks.map((link) => (
            <a 
              key={link.href} 
              href={link.href} 
              className={`font-bold uppercase text-[12.5px] tracking-[0.1em] text-ink relative transition-colors 
                after:content-[''] after:absolute after:left-0 after:bottom-[-5px] after:height-[5px] after:h-[5px] after:bg-yellow after:transition-all after:duration-250 after:-z-10
                hover:after:right-0 ${activeSection === link.href.substring(1) ? 'after:right-0 after:bg-peach' : 'after:right-[100%]'}`}
            >
              {link.label}
            </a>
          ))}
          <Button href="#contact" variant="" className="text-[13px] font-black text-white bg-orange px-[22px] py-[10px] border-ink shadow-[4px_4px_0_var(--color-ink)] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[7px_7px_0_var(--color-ink)] hover:bg-green hover:text-white">
            Hire Me
          </Button>
          <button 
            onClick={toggleTheme} 
            className="flex items-center justify-center w-10 h-10 border-2 border-ink bg-paper shadow-[3px_3px_0_var(--color-ink)] hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[5px_5px_0_var(--color-ink)] transition-all cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={20} className="text-orange" /> : <Moon size={20} className="text-ink" />}
          </button>
        </div>

        {/* Mobile Toggle & Hire Me */}
        <div className="flex md:hidden items-center gap-3">
          <Button href="#contact" variant="" className="text-[11px] font-black text-white bg-orange px-3 py-2 border-2 border-ink shadow-[2px_2px_0_var(--color-ink)] hover:bg-green">
            Hire Me
          </Button>
          <button 
            onClick={toggleTheme} 
            className="flex items-center justify-center w-8 h-8 border-2 border-ink bg-paper shadow-[2px_2px_0_var(--color-ink)] transition-all cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={16} className="text-orange" /> : <Moon size={16} className="text-ink" />}
          </button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-1 text-ink focus:outline-none cursor-pointer">
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-paper border-b-3 border-ink shadow-xl flex flex-col items-center py-6 gap-6">
          {navLinks.map((link) => (
            <a 
              key={link.href} 
              href={link.href} 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`font-bold uppercase text-[14px] tracking-[0.1em] text-ink relative transition-colors 
                after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:h-[4px] after:bg-yellow after:transition-all after:duration-250 after:-z-10
                hover:after:right-0 ${activeSection === link.href.substring(1) ? 'after:right-0 after:bg-peach' : 'after:right-[100%]'}`}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};
