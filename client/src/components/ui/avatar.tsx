import React from "react";

export const Avatar = ({ children, className = "" }: { children?: React.ReactNode; className?: string }) => (
  <div className={`rounded-full overflow-hidden ${className}`}>{children}</div>
);

export const AvatarImage = ({ src, alt }: { src?: string; alt?: string }) => (
  <img src={src} alt={alt} />
);

export const AvatarFallback = ({ children }: { children?: React.ReactNode }) => (
  <div>{children}</div>
);
