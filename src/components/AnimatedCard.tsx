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
      initial={{ opacity: 0, y: 20, scale: 0.95, rotateX: 10 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={hover ? {
        scale: 1.03,
        y: -8,
        rotateX: -2,
        rotateY: 2,
        transition: {
          duration: 0.4,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      } : undefined}
      whileTap={hover ? {
        scale: 0.97,
        rotateX: 5,
        transition: {
          duration: 0.15,
          ease: 'easeInOut',
        },
      } : undefined}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
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
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 1.0,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      viewport={{ once: true, margin: '-50px' }}
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
      initial={{ opacity: 0, x: -30, filter: 'blur(4px)' }}
      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      viewport={{ once: true }}
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
      className={`glass-chakra-heart px-6 py-3 rounded-xl text-white font-medium transition-all duration-300 ${className}`}
      initial={{ scale: 1 }}
      whileHover={{
        scale: 1.08,
        rotateY: 5,
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
        transition: {
          duration: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      }}
      whileTap={{
        scale: 0.92,
        rotateY: -2,
        transition: {
          duration: 0.15,
          ease: 'easeInOut',
        },
      }}
      onClick={onClick}
      style={{
        transformStyle: 'preserve-3d',
      }}
      {...props}
    >
      {children}
    </motion.button>
  );
}