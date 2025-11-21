import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'glass' | 'gold-glass';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  icon,
  isLoading,
  ...props 
}) => {
  const baseStyles = "relative inline-flex items-center justify-center rounded-sm font-display tracking-wider uppercase transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden";
  
  const variants = {
    primary: "bg-gradient-to-r from-gold-400 to-gold-600 text-stone-950 font-bold hover:from-gold-300 hover:to-gold-500 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] border border-gold-300/50",
    secondary: "bg-stone-800 text-stone-200 hover:bg-stone-700 border border-stone-700",
    outline: "border border-gold-500/50 text-gold-400 hover:bg-gold-900/20 hover:border-gold-400 hover:text-gold-300",
    glass: "bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 shadow-lg",
    "gold-glass": "bg-gold-900/20 backdrop-blur-md border border-gold-500/20 text-gold-200 hover:bg-gold-900/40 hover:border-gold-500/40",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-8 py-3 text-sm",
    lg: "px-10 py-4 text-base",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-inherit">
          <div className="w-4 h-4 border-2 border-stone-800/30 border-t-stone-900 rounded-full animate-spin" />
        </div>
      )}
      <span className={`flex items-center gap-2 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {children}
        {icon && <span className="ml-1">{icon}</span>}
      </span>
    </motion.button>
  );
};