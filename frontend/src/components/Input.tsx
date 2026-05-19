import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  error,
  className = '',
  ...props
}) => {
  const baseStyles =
    'w-full px-4 py-2 rounded-lg border bg-slate-900 text-white placeholder-slate-400 transition-colors duration-200 focus:outline-none focus:ring-2';

  const stateStyles = error
    ? 'border-red-600 focus:ring-red-500 focus:border-red-600'
    : 'border-slate-700 focus:ring-blue-500 focus:border-blue-600 hover:border-slate-600';

  return (
    <div>
      <input
        {...props}
        className={`${baseStyles} ${stateStyles} ${className}`}
      />
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
  );
};
