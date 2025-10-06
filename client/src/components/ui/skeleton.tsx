import React from "react";

export const Skeleton = ({ className = "", children }: { className?: string; children?: React.ReactNode }) => (
  <div className={`bg-gray-200 animate-pulse ${className}`}>{children}</div>
);
