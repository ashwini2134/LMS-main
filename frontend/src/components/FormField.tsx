import React from 'react';
import { Input } from './Input';

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  required = false,
  inputProps,
}) => {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-slate-200">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <Input {...inputProps} error={error} />
    </div>
  );
};
