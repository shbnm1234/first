import React from 'react';

export function Switch({ checked, onChange, onCheckedChange, ...rest }: { checked?: boolean; onChange?: (v: boolean)=>void; onCheckedChange?: (v: boolean)=>void } & React.HTMLAttributes<HTMLButtonElement>) {
  const handle = () => {
    if (onCheckedChange) onCheckedChange(!checked);
    if (onChange) onChange(!checked);
  };
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={handle}
      {...rest}
    />
  );
}
