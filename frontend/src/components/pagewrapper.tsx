// src/components/PageWrapper.tsx
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { easeInOut } from 'framer-motion';

interface PageWrapperProps {
  children: ReactNode;
}

const slideVariants = {
  initial: { x: '100%', opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: '-100%', opacity: 0 },
  transition: {
  duration: 2,
  ease: easeInOut
}
};


export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <motion.div
      initial={slideVariants.initial}
      animate={slideVariants.animate}
      exit={slideVariants.exit}
      transition={slideVariants.transition}
    >
      {children}
    </motion.div>
  );
}
