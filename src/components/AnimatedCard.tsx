'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
}

export default function AnimatedCard({ 
  children, 
  className = '', 
  delay = 0, 
  hover = true 
}: AnimatedCardProps) {
  return (
    <motion.div
      className={`glass-card ${className}`}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={hover ? {
        scale: 1.02,
        y: -5,
        transition: {
          duration: 0.3,
          ease: 'easeOut',
        },
      } : undefined}
      whileTap={hover ? {
        scale: 0.98,
        transition: {
          duration: 0.1,
        },
      } : undefined}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedSection({ 
  children, 
  className = '', 
  delay = 0 
}: Omit<AnimatedCardProps, 'hover'>) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedText({ 
  children, 
  className = '', 
  delay = 0 
}: Omit<AnimatedCardProps, 'hover'>) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.6,
        delay,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedButton({ 
  children, 
  className = '', 
  onClick,
  ...props 
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
} & Record<string, unknown>) {
  return (
    <motion.button
      className={`glass px-6 py-3 rounded-xl text-white font-medium transition-all duration-200 ${className}`}
      whileHover={{
        scale: 1.05,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
        transition: {
          duration: 0.2,
        },
      }}
      whileTap={{
        scale: 0.95,
        transition: {
          duration: 0.1,
        },
      }}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );
}