'use client';

import { motion } from 'framer-motion';
import { InputHTMLAttributes, forwardRef, useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const inputVariants = cva(
  'flex w-full rounded-xl border bg-transparent px-4 py-3 text-white placeholder:text-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'glass border-white/20 focus:border-white/40 focus:bg-white/5',
        filled: 'bg-white/10 border-white/30 focus:border-white/50 focus:bg-white/15',
        outline: 'border-2 border-white/30 focus:border-white/60 hover:border-white/40',
      },
      size: {
        default: 'h-12 px-4 py-3',
        sm: 'h-9 px-3 py-2 text-sm',
        lg: 'h-14 px-5 py-4 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onDrag'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    className,
    variant,
    size,
    type,
    label,
    error,
    helperText,
    icon,
    iconPosition = 'left',
    ...props
  }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    
    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    return (
      <motion.div 
        className="w-full"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {label && (
          <motion.label 
            className="block text-sm font-medium text-white/80 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {label}
          </motion.label>
        )}
        
        <div className="relative">
          {icon && iconPosition === 'left' && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60">
              {icon}
            </div>
          )}
          
          <motion.input
            type={inputType}
            className={cn(
              inputVariants({ variant, size }),
              icon && iconPosition === 'left' && 'pl-10',
              (icon && iconPosition === 'right') || isPassword ? 'pr-10' : '',
              error && 'border-red-400 focus:border-red-400 focus:ring-red-400/20',
              className
            )}
            ref={ref}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            whileFocus={{
              scale: 1.01,
              transition: { duration: 0.2 }
            }}
            {...props}
          />
          
          {icon && iconPosition === 'right' && !isPassword && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60">
              {icon}
            </div>
          )}
          
          {isPassword && (
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/80 transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          )}
          
          {isFocused && (
            <motion.div
              className="absolute inset-0 rounded-xl border-2 border-blue-400/50 pointer-events-none"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </div>
        
        {(error || helperText) && (
          <motion.div 
            className="mt-2"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {error ? (
              <p className="text-sm text-red-400">{error}</p>
            ) : (
              <p className="text-sm text-white/60">{helperText}</p>
            )}
          </motion.div>
        )}
      </motion.div>
    );
  }
);

Input.displayName = 'Input';

export { Input, inputVariants };
export default Input;