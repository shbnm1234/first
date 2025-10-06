import React from "react";

export const Input = ({ className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} className={`border rounded px-3 py-2 ${className}`} />
);
