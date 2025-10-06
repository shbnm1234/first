import React from "react";

export const Separator = ({ className = "" }: { className?: string }) => (
  <div className={`h-px bg-gray-200 my-4 ${className}`} />
);
