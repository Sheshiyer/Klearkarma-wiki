// UI Component Library Export
// Klear Karma Design System

// Core Components
export { Button, type ButtonProps } from './Button';
export { Input, type InputProps } from './Input';
export { 
  Modal, 
  ConfirmModal, 
  type ModalProps 
} from './Modal';
export { 
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  StatsCard,
  FeatureCard,
  type CardProps 
} from './Card';

// Animated Components (from existing)
export { default as AnimatedCard } from '../AnimatedCard';
export { AnimatedSection, AnimatedText, AnimatedButton } from '../AnimatedCard';

// Layout Components
export { default as WikiLayout } from '../WikiLayout';
export { default as AnimatedBackground } from '../AnimatedBackground';

// Utility Components
export { default as MarkdownRenderer } from '../MarkdownRenderer';

// Design System Constants
export const DESIGN_TOKENS = {
  colors: {
    primary: {
      50: 'rgba(59, 130, 246, 0.05)',
      100: 'rgba(59, 130, 246, 0.1)',
      200: 'rgba(59, 130, 246, 0.2)',
      500: 'rgb(59, 130, 246)',
      600: 'rgb(37, 99, 235)',
    },
    glass: {
      light: 'rgba(255, 255, 255, 0.08)',
      medium: 'rgba(255, 255, 255, 0.12)',
      dark: 'rgba(255, 255, 255, 0.03)',
    },
    text: {
      primary: 'rgb(255, 255, 255)',
      secondary: 'rgba(255, 255, 255, 0.8)',
      muted: 'rgba(255, 255, 255, 0.6)',
      disabled: 'rgba(255, 255, 255, 0.4)',
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  borderRadius: {
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
  },
  shadows: {
    glass: '0 8px 32px 0 rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    hover: '0 25px 70px 0 rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
  },
  animations: {
    duration: {
      fast: '0.1s',
      normal: '0.2s',
      slow: '0.3s',
    },
    easing: {
      default: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
};

// Component Usage Guidelines
export const USAGE_GUIDELINES = {
  Button: {
    description: 'Interactive button component with multiple variants and animations',
    variants: ['default', 'primary', 'secondary', 'outline', 'ghost', 'destructive'],
    sizes: ['sm', 'default', 'lg', 'icon'],
    bestPractices: [
      'Use primary variant for main actions',
      'Use destructive variant for dangerous actions',
      'Include loading state for async operations',
      'Add icons for better visual hierarchy',
    ],
  },
  Input: {
    description: 'Form input component with glassmorphism styling and validation',
    variants: ['default', 'filled', 'outline'],
    sizes: ['sm', 'default', 'lg'],
    bestPractices: [
      'Always provide labels for accessibility',
      'Use error states for validation feedback',
      'Include helper text for guidance',
      'Use appropriate input types (email, password, etc.)',
    ],
  },
  Modal: {
    description: 'Overlay component for dialogs and confirmations',
    sizes: ['sm', 'md', 'lg', 'xl', 'full'],
    bestPractices: [
      'Include clear titles and descriptions',
      'Provide escape key functionality',
      'Use ConfirmModal for destructive actions',
      'Prevent body scroll when open',
    ],
  },
  Card: {
    description: 'Container component with glassmorphism effects',
    variants: ['default', 'glass', 'glass-dark', 'solid', 'gradient', 'outline'],
    sizes: ['sm', 'default', 'lg', 'xl'],
    bestPractices: [
      'Use StatsCard for metrics display',
      'Use FeatureCard for feature highlights',
      'Include hover effects for interactive cards',
      'Maintain consistent spacing with sub-components',
    ],
  },
};

// Theme Configuration
export const THEME_CONFIG = {
  glassmorphism: {
    background: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    borderRadius: '24px',
    boxShadow: '0 12px 40px 0 rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
  },
  animations: {
    fadeIn: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.3 },
    },
    scaleIn: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.2 },
    },
    slideIn: {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.3 },
    },
  },
};

// Export types for TypeScript support
export type DesignTokens = typeof DESIGN_TOKENS;
export type ThemeConfig = typeof THEME_CONFIG;
export type UsageGuidelines = typeof USAGE_GUIDELINES;