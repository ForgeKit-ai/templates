import React from 'react';
import { cn } from '../../lib/utils';

export function LoadingSpinner({ className, size = 'md' }) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  return (
    <div className="flex justify-center items-center">
      <svg
        className={cn(
          'animate-spin text-primary-500',
          sizes[size],
          className
        )}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
}

export function ButtonSpinner({ className, size = 'sm' }) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <svg
      className={cn(
        'animate-spin text-current',
        sizes[size],
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

export function PageLoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="xl" />
        <p className="mt-4 text-neutral-600">Loading...</p>
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="card animate-pulse">
      <div className="h-48 bg-neutral-200 skeleton"></div>
      <div className="p-6 space-y-4">
        <div className="flex items-center space-x-2">
          <div className="h-4 w-16 bg-neutral-200 skeleton"></div>
        </div>
        <div className="space-y-2">
          <div className="h-6 bg-neutral-200 skeleton"></div>
          <div className="h-6 bg-neutral-200 skeleton w-4/5"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-neutral-200 skeleton"></div>
          <div className="h-4 bg-neutral-200 skeleton"></div>
          <div className="h-4 bg-neutral-200 skeleton w-3/4"></div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-6 w-6 bg-neutral-200 rounded-full skeleton"></div>
            <div className="h-4 w-20 bg-neutral-200 skeleton"></div>
          </div>
          <div className="h-4 w-16 bg-neutral-200 skeleton"></div>
        </div>
      </div>
    </div>
  );
}

export function PostSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-pulse">
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="h-8 bg-neutral-200 skeleton w-3/4"></div>
          <div className="h-8 bg-neutral-200 skeleton w-1/2"></div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="h-10 w-10 bg-neutral-200 rounded-full skeleton"></div>
          <div className="space-y-2">
            <div className="h-4 w-32 bg-neutral-200 skeleton"></div>
            <div className="h-4 w-24 bg-neutral-200 skeleton"></div>
          </div>
        </div>
        <div className="h-64 bg-neutral-200 skeleton rounded-lg"></div>
        <div className="space-y-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-neutral-200 skeleton"></div>
              <div className="h-4 bg-neutral-200 skeleton w-5/6"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}