import React from 'react';
import { cn } from '../../lib/utils';

export function Card({
  className,
  children,
  hover = true,
  variant = 'default',
  ...props
}) {
  const variants = {
    default: 'card',
    hero: 'card-hero',
    interactive: hover ? 'card-interactive' : 'card',
  };

  return (
    <div
      className={cn(
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }) {
  return (
    <div
      className={cn('p-6 pb-0', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardContent({ className, children, ...props }) {
  return (
    <div
      className={cn('p-6', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...props }) {
  return (
    <div
      className={cn('p-6 pt-0', className)}
      {...props}
    >
      {children}
    </div>
  );
}