import { useEffect } from 'react';

export const useInkTrail = () => {
  useEffect(() => {
    let lastInk = 0;
    
    const handleMouseMove = (e) => {
      if (document.body.classList.contains('no-trail')) return;
      const now = Date.now();
      if (now - lastInk < 45) return;
      lastInk = now;
      
      const cs = getComputedStyle(document.documentElement);
      // Fallback colors if variables aren't defined yet, but they will be.
      const inkColors = [
        cs.getPropertyValue('--orange').trim() || '#ff6b1a', 
        cs.getPropertyValue('--yellow').trim() || '#ffd41f', 
        cs.getPropertyValue('--green').trim() || '#23a05a', 
        cs.getPropertyValue('--peach').trim() || '#ffb25e'
      ];
      
      const d = document.createElement('div');
      d.className = 'ink-dot';
      d.style.background = inkColors[Math.floor(Math.random() * inkColors.length)];
      d.style.left = (e.clientX - 4) + 'px';
      d.style.top = (e.clientY - 4) + 'px';
      document.body.appendChild(d);
      
      setTimeout(() => { d.remove(); }, 720);
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
};
