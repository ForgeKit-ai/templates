import React from 'react';
import { cn } from '../../lib/utils';

const badgeVariants = {
  variant: {
    primary: 'badge-primary',
    secondary: 'badge-secondary',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
  },
  size: {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-base',
  },
};

export function Badge({
  className,
  variant = 'primary',
  size = 'md',
  children,
  ...props
}) {
  return (
    <span
      className={cn(
        'badge',
        badgeVariants.variant[variant],
        badgeVariants.size[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}