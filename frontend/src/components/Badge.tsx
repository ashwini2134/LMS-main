import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error' | 'default';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className = '',
}) => {
  const baseStyles = 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium';

  const variantStyles = {
    info: 'bg-blue-900 text-blue-200',
    success: 'bg-green-900 text-green-200',
    warning: 'bg-amber-900 text-amber-200',
    error: 'bg-red-900 text-red-200',
    default: 'bg-slate-700 text-slate-200',
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};
