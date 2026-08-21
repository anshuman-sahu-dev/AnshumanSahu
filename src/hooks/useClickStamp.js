import { useEffect } from 'react';

export const useClickStamp = () => {
  useEffect(() => {
    const stamps = ['NICE!', 'YES!', 'WOW', '★'];
    
    const handleClick = (e) => {
      // Don't stamp if clicking on interactive elements
      if (e.target.closest('a, button, input, textarea')) return;
      
      const s = document.createElement('div');
      s.className = 'oss-stamp';
      s.textContent = stamps[Math.floor(Math.random() * stamps.length)];
      s.style.left = (e.clientX - 40) + 'px';
      s.style.top = (e.clientY - 24) + 'px';
      document.body.appendChild(s);
      
      setTimeout(() => { s.remove(); }, 1150);
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);
};
