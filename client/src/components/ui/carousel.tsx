import React from 'react';

export const Carousel: React.FC<React.HTMLAttributes<HTMLDivElement> & { opts?: any }> = ({ children, className = '', opts, ...props }) => {
  return (
    <div {...props} className={className}>
      {children}
    </div>
  );
};

export const CarouselContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = '', ...props }) => (
  <div {...props} className={className}>
    {children}
  </div>
);

export const CarouselItem: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = '', ...props }) => (
  <div {...props} className={className}>
    {children}
  </div>
);

export const CarouselPrevious: React.FC<React.HTMLAttributes<HTMLButtonElement>> = ({ children, className = '', ...props }) => (
  <button {...props} className={className}>
    {children || '<'}
  </button>
);

export const CarouselNext: React.FC<React.HTMLAttributes<HTMLButtonElement>> = ({ children, className = '', ...props }) => (
  <button {...props} className={className}>
    {children || '>'}
  </button>
);

export default Carousel;
