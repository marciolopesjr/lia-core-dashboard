import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

interface BentoCardProps {
  title?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const BentoCard = ({ title, icon, children, className }: BentoCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.01 }}
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0a0b] p-6 backdrop-blur-xl transition-all hover:border-magenta/50 hover:shadow-[0_0_30px_rgba(255,0,255,0.15)]",
        className
      )}
    >
      {title && (
        <div className="mb-4 flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.15em] text-white/40">
          {icon && <span className="text-magenta">{icon}</span>}
          {title}
        </div>
      )}
      {children}
    </motion.div>
  );
};
