import React from "react";

export const Label = ({ children, className = "", ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) => (
  <label {...props} className={`block text-sm font-medium ${className}`}>
    {children}
  </label>
);
