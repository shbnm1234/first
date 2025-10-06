import React from 'react';

export function ColorPicker(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input type="color" {...props} />;
}
