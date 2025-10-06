import React from 'react';

export const Dialog = ({ children, open, onOpenChange }: any) => {
  // very small shim: just render children when open is true or always render if open is undefined
  return <div>{children}</div>;
};

export const DialogTrigger = ({ children, asChild = false, ...props }: any) => {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement, props);
  }
  return <button {...props}>{children}</button>;
};

export const DialogContent = ({ children, className = '', ...props }: any) => (
  <div {...props} className={`p-4 bg-white rounded shadow ${className}`}>
    {children}
  </div>
);

export const DialogHeader = ({ children, className = '' }: any) => (
  <div className={`mb-4 ${className}`}>{children}</div>
);

export const DialogTitle = ({ children, className = '' }: any) => (
  <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>
);

export const DialogDescription = ({ children, className = '' }: any) => (
  <p className={`text-sm text-gray-600 ${className}`}>{children}</p>
);

export default Dialog;
