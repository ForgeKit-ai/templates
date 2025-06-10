import React from 'react';
import { cn } from '../../lib/utils';
import { generateAvatarUrl } from '../../lib/utils';

export function Avatar({
  src,
  alt,
  name,
  size = 'md',
  className,
  fallback,
  ...props
}) {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
    '2xl': 'w-20 h-20 text-xl',
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleImageError = (e) => {
    if (name) {
      e.target.src = generateAvatarUrl(name, parseInt(sizes[size].match(/\d+/)[0]) * 4);
    }
  };

  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center overflow-hidden rounded-full bg-neutral-100',
        sizes[size],
        className
      )}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt || name || 'Avatar'}
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
      ) : (
        <span className="font-medium text-neutral-600">
          {fallback || getInitials(name)}
        </span>
      )}
    </div>
  );
}

export function AvatarGroup({ children, max = 3, className }) {
  const items = React.Children.toArray(children);
  const visibleItems = items.slice(0, max);
  const remainingCount = items.length - max;

  return (
    <div className={cn('flex items-center -space-x-2', className)}>
      {visibleItems.map((child, index) => (
        <div key={index} className="relative ring-2 ring-white rounded-full">
          {child}
        </div>
      ))}
      {remainingCount > 0 && (
        <div className="relative ring-2 ring-white rounded-full">
          <Avatar
            fallback={`+${remainingCount}`}
            className="bg-neutral-300"
          />
        </div>
      )}
    </div>
  );
}