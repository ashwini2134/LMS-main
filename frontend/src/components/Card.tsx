import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'elevated';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className = '',
  ...props
}) => {
  const baseStyles = 'rounded-lg border border-slate-700 bg-slate-800 transition-all duration-200';
  const variantStyles = {
    default: 'hover:border-slate-600 hover:shadow-lg shadow-md',
    elevated: 'shadow-lg hover:shadow-xl border-slate-600',
  };

  return (
    <div
      {...props}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </div>
  );
};
