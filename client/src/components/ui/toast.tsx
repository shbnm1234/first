import React from 'react';

export type ToastProps = {
  id?: string
  title?: React.ReactNode
  description?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  action?: React.ReactElement | null
  variant?: string
}

export type ToastActionElement = React.ReactElement | null

export function Toast({ children }: { children?: React.ReactNode }) {
  return <div className="fixed bottom-4 right-4">{children}</div>;
}

export default Toast;
