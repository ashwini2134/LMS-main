import React from 'react';

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footerText: string;
  footerLink: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  title,
  subtitle,
  children,
  footerText,
  footerLink,
}) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-8 bg-slate-900">
      {/* Gradient Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="mb-12 flex justify-center">
          <img
            src={`${import.meta.env.BASE_URL}logo.svg`}
            alt="Fraylon Academy"
            className="h-14 w-auto object-contain drop-shadow-lg"
          />
        </div>

        {/* Card */}
        <div className="rounded-xl border border-slate-700/50 bg-slate-800/40 backdrop-blur-xl shadow-2xl p-8 md:p-10">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{title}</h1>
            <p className="text-slate-400 text-sm md:text-base">{subtitle}</p>
          </div>

          {children}

          {/* Footer Link */}
          <div className="mt-8 border-t border-slate-700/50 pt-6 text-center">
            <p className="text-sm text-slate-400">
              {footerText}{' '}
              {footerLink}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
