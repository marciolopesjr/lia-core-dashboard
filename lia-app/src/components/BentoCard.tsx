import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

interface BentoCardProps {
  title?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const BentoCard = ({ title, icon, children, className, onClick }: BentoCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.01 }}
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-apple border border-white/10 bg-[#0a0a0b]/80 p-8 backdrop-blur-2xl transition-all duration-500 hover:border-magenta/30 hover:bg-[#0a0a0b]/90 hover:shadow-[0_0_40px_rgba(255,0,255,0.1)]",
        onClick && "cursor-pointer",
        className
      )}
    >
      {/* Glossy overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />

      {title && (
        <div className="relative z-10 mb-6 flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-white/30 transition-colors group-hover:text-white/50">
          {icon && <span className="text-magenta/80 group-hover:text-magenta">{icon}</span>}
          {title}
        </div>
      )}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
};
