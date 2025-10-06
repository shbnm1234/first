import React from "react";

export const Button = ({ children, className = "", size, asChild = false, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: string; size?: 'sm' | 'md' | 'lg'; asChild?: boolean }) => {
  const sizeClass = size === 'sm' ? 'px-2 py-1 text-sm' : size === 'lg' ? 'px-4 py-3 text-lg' : 'px-3 py-2';
  const mergedClass = `${sizeClass} rounded-md bg-primary text-white ${className}`.trim();

  // If used with asChild (like Radix UI), clone the child element and merge props
  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement;
    const childClass = (child.props && child.props.className) || '';
    return React.cloneElement(child, { ...props, className: `${childClass} ${mergedClass}`.trim() });
  }

  return (
    <button {...props} className={mergedClass}>
      {children}
    </button>
  );
};
