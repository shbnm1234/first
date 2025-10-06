import React from "react";

export const Badge = ({ children, className = "", ...props }: React.HTMLAttributes<HTMLSpanElement> & { variant?: string }) => (
  <span {...props} className={`inline-flex items-center px-2 py-1 text-xs rounded ${className}`}>
    {children}
  </span>
);
