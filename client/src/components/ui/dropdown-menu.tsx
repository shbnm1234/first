import React from 'react';

export const DropdownMenu = ({ children }: { children?: React.ReactNode }) => {
  return <div className="relative inline-block">{children}</div>;
};

export const DropdownMenuTrigger = ({ children, asChild = false, ...props }: any) => {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement, props);
  }
  return (
    <button {...props} className={`inline-flex items-center ${props.className || ''}`}>
      {children}
    </button>
  );
};

export const DropdownMenuContent = ({ children, className = '', ...props }: any) => {
  return <div {...props} className={`absolute right-0 mt-2 bg-white border shadow-sm rounded ${className}`}>{children}</div>;
};

export const DropdownMenuItem = ({ children, className = '', ...props }: any) => {
  return (
    <div {...props} className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${className}`}>
      {children}
    </div>
  );
};

export const DropdownMenuLabel = ({ children, className = '', ...props }: any) => (
  <div {...props} className={`px-4 py-2 text-xs text-gray-500 ${className}`}>{children}</div>
);

export const DropdownMenuSeparator = ({ className = '', ...props }: any) => (
  <div {...props} className={`my-2 h-px bg-gray-100 ${className}`} />
);

export default DropdownMenu;
