import React from 'react';
import { LucideIcon } from 'lucide-react';

export type ThemeColor = 'blue' | 'indigo' | 'orange' | 'amber' | 'emerald' | 'cyan' | 'purple' | 'slate' | 'rose';

interface AnalysisCardProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  themeColor: ThemeColor;
  delay?: number;
  className?: string;
}

const colorStyles: Record<ThemeColor, { iconBg: string, iconColor: string, borderColor: string }> = {
  blue: {
    iconBg: 'bg-blue-50 dark:bg-blue-900/30',
    iconColor: 'text-blue-600 dark:text-blue-300',
    borderColor: 'border-l-blue-500'
  },
  indigo: {
    iconBg: 'bg-indigo-50 dark:bg-indigo-900/30',
    iconColor: 'text-indigo-600 dark:text-indigo-300',
    borderColor: 'border-l-indigo-500'
  },
  orange: {
    iconBg: 'bg-orange-50 dark:bg-orange-900/30',
    iconColor: 'text-orange-600 dark:text-orange-300',
    borderColor: 'border-l-orange-500'
  },
  amber: {
    iconBg: 'bg-amber-50 dark:bg-amber-900/30',
    iconColor: 'text-amber-600 dark:text-amber-300',
    borderColor: 'border-l-amber-500'
  },
  emerald: {
    iconBg: 'bg-emerald-50 dark:bg-emerald-900/30',
    iconColor: 'text-emerald-600 dark:text-emerald-300',
    borderColor: 'border-l-emerald-500'
  },
  cyan: {
    iconBg: 'bg-cyan-50 dark:bg-cyan-900/30',
    iconColor: 'text-cyan-600 dark:text-cyan-300',
    borderColor: 'border-l-cyan-500'
  },
  purple: {
    iconBg: 'bg-purple-50 dark:bg-purple-900/30',
    iconColor: 'text-purple-600 dark:text-purple-300',
    borderColor: 'border-l-purple-500'
  },
  slate: {
    iconBg: 'bg-slate-50 dark:bg-slate-800',
    iconColor: 'text-slate-600 dark:text-slate-300',
    borderColor: 'border-l-slate-500'
  },
  rose: {
    iconBg: 'bg-rose-50 dark:bg-rose-900/30',
    iconColor: 'text-rose-600 dark:text-rose-300',
    borderColor: 'border-l-rose-500'
  }
};

const AnalysisCard: React.FC<AnalysisCardProps> = ({ title, icon: Icon, children, themeColor, delay = 0, className = "" }) => {
  const styles = colorStyles[themeColor];

  return (
    <div 
      className={`bg-white dark:bg-stone-900 rounded-xl shadow-sm border border-stone-100 dark:border-stone-800 p-6 md:p-8 animate-fade-in-up ${className}`}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
    >
      <div className="flex items-center gap-3 mb-6 border-b border-stone-100 dark:border-stone-800 pb-4">
        <div className={`p-2 rounded-lg ${styles.iconBg} transition-colors`}>
          <Icon className={`h-6 w-6 ${styles.iconColor}`} />
        </div>
        <h3 className="text-xl font-bold text-stone-800 dark:text-stone-100 font-serif">{title}</h3>
      </div>
      <div className="text-stone-600 dark:text-stone-300 leading-relaxed text-lg">
        {children}
      </div>
    </div>
  );
};

export default AnalysisCard;