import React from 'react';

export function Select({ children, value, onValueChange }: { children?: React.ReactNode; value?: string; onValueChange?: (v: string) => void }) {
  // Very small shim: render a native select when onValueChange is provided
  if (onValueChange) {
    return (
      <select value={value} onChange={(e) => onValueChange(e.target.value)} className="border rounded-md px-2 py-1">
        {React.Children.map(children, (child: any) => {
          if (!child) return null;
          // support our SelectItem placeholder which will be a div with props.value
          if (child.props && child.props.value) {
            return <option value={child.props.value}>{child.props.children}</option>;
          }
          return child;
        })}
      </select>
    );
  }

  return <div className="inline-block">{children}</div>;
}

export function SelectTrigger(props: any) {
  return <div {...props} />;
}

export function SelectValue(props: any) {
  return <span {...props} />;
}

export function SelectContent(props: any) {
  return <div {...props} />;
}

export function SelectItem(props: any) {
  return <div {...props} />;
}

export default Select;
