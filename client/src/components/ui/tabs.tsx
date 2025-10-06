import React from 'react';

export function Tabs(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} />;
}
export function TabsList(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} />;
}
export function TabsTrigger(props: React.ButtonHTMLAttributes<HTMLButtonElement> & { value?: string }) {
  // ignore value at runtime; it's used for typing in the original component
  const { value, ...rest } = props as any;
  return <button type="button" {...(rest as any)} />;
}
export function TabsContent(props: React.HTMLAttributes<HTMLDivElement> & { value?: string }) {
  const { value, ...rest } = props as any;
  return <div {...(rest as any)} />;
}
