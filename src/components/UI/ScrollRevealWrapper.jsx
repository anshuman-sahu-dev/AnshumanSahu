import { motion } from 'framer-motion';

export const ScrollRevealWrapper = ({ children, className = '', delay = 0, style = {} }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 44, rotate: 1 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};
