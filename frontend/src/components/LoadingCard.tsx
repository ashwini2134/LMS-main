import React from 'react';
import { Card } from './Card';

interface LoadingCardProps {
  lines?: number;
  className?: string;
}

export const LoadingCard: React.FC<LoadingCardProps> = ({
  lines = 3,
  className = '',
}) => {
  return (
    <Card className={`p-4 ${className}`}>
      <div className="space-y-3">
        {/* Title skeleton */}
        <div className="h-6 bg-slate-700 rounded-lg w-3/4 animate-pulse" />
        
        {/* Content skeleton lines */}
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`h-4 bg-slate-700 rounded-lg animate-pulse ${
              index === lines - 1 ? 'w-5/6' : 'w-full'
            }`}
          />
        ))}
      </div>
    </Card>
  );
};
