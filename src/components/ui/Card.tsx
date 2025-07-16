'use client';

import { motion } from 'framer-motion';
import { ReactNode, HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const cardVariants = cva(
  'rounded-2xl transition-all duration-300 relative overflow-hidden',
  {
    variants: {
      variant: {
        default: 'glass-card',
        glass: 'glass',
        'glass-dark': 'glass-dark',
        solid: 'bg-white/10 border border-white/20',
        gradient: 'bg-gradient-to-br from-white/10 to-white/5 border border-white/20',
        outline: 'border-2 border-white/30 bg-transparent',
      },
      size: {
        sm: 'p-4',
        default: 'p-6',
        lg: 'p-8',
        xl: 'p-10',
      },
      hover: {
        none: '',
        lift: 'hover:scale-[1.02] hover:-translate-y-2',
        glow: 'hover:shadow-2xl hover:shadow-blue-500/20',
        both: 'hover:scale-[1.02] hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      hover: 'lift',
    },
  }
);

export interface CardProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onDrag'>,
    VariantProps<typeof cardVariants> {
  children: ReactNode;
  animated?: boolean;
  delay?: number;
  clickable?: boolean;
}

export function Card({
  className,
  variant,
  size,
  hover,
  children,
  animated = true,
  delay = 0,
  clickable = false,
  onClick,
  ...props
}: CardProps) {
  const Component = animated ? motion.div : 'div';
  
  const animationProps = animated ? {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: {
      duration: 0.5,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
    whileHover: hover !== 'none' ? {
      scale: hover === 'lift' || hover === 'both' ? 1.02 : 1,
      y: hover === 'lift' || hover === 'both' ? -8 : 0,
      transition: { duration: 0.2 },
    } : undefined,
    whileTap: clickable ? {
      scale: 0.98,
      transition: { duration: 0.1 },
    } : undefined,
  } : {};

  return (
    <Component
      className={cn(
        cardVariants({ variant, size, hover }),
        clickable && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      {...animationProps}
      {...props}
    >
      {children}
    </Component>
  );
}

// Card sub-components
export function CardHeader({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex flex-col space-y-1.5 pb-4', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn('text-xl font-semibold text-white leading-none tracking-tight', className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('text-white/70 text-sm', className)}
      {...props}
    >
      {children}
    </p>
  );
}

export function CardContent({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('pt-0', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex items-center pt-4', className)}
      {...props}
    >
      {children}
    </div>
  );
}

// Specialized card components
export function StatsCard({
  title,
  value,
  description,
  icon,
  trend,
  trendValue,
  className,
  ...props
}: {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
} & Omit<CardProps, 'children'>) {
  const trendColors = {
    up: 'text-green-400',
    down: 'text-red-400',
    neutral: 'text-white/60',
  };

  return (
    <Card className={className} {...props}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-white/70 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
          {description && (
            <p className="text-white/60 text-xs mt-1">{description}</p>
          )}
        </div>
        {icon && (
          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-white/80">
            {icon}
          </div>
        )}
      </div>
      {trend && trendValue && (
        <div className="flex items-center mt-3 pt-3 border-t border-white/10">
          <span className={cn('text-xs font-medium', trendColors[trend])}>
            {trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→'} {trendValue}
          </span>
        </div>
      )}
    </Card>
  );
}

export function FeatureCard({
  title,
  description,
  icon,
  href,
  className,
  ...props
}: {
  title: string;
  description: string;
  icon?: ReactNode;
  href?: string;
  className?: string;
} & Omit<CardProps, 'children'>) {
  const Component = href ? 'a' : 'div';
  const linkProps = href ? { href } : {};

  return (
    <Card className={className} clickable={!!href} {...props}>
      <Component {...linkProps} className="block h-full">
        {icon && (
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center mb-4 text-white">
            {icon}
          </div>
        )}
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-white/70 text-sm leading-relaxed">{description}</p>
      </Component>
    </Card>
  );
}

export default Card;