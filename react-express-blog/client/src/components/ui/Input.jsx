import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';

export const Input = forwardRef(({
  className,
  type = 'text',
  error,
  label,
  hint,
  icon,
  ...props
}, ref) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="form-label" htmlFor={props.id}>
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-neutral-400">{icon}</span>
          </div>
        )}
        <input
          type={type}
          className={cn(
            'form-input',
            icon && 'pl-10',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
      {hint && !error && (
        <p className="text-sm text-neutral-500">{hint}</p>
      )}
      {error && (
        <p className="form-error">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';