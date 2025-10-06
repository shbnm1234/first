import React from 'react';

export const Table = ({ children, className = '' }: { children?: React.ReactNode; className?: string }) => (
  <div className={`w-full ${className}`}>{children}</div>
);

export const TableHeader = ({ children, className = '' }: { children?: React.ReactNode; className?: string }) => (
  <div className={`mb-2 ${className}`}>{children}</div>
);

export const TableRow = ({ children, className = '' }: { children?: React.ReactNode; className?: string }) => (
  <div className={`flex items-center ${className}`}>{children}</div>
);

export const TableHead = ({ children, className = '' }: { children?: React.ReactNode; className?: string }) => (
  <div className={`font-semibold ${className}`}>{children}</div>
);

export const TableBody = ({ children, className = '' }: { children?: React.ReactNode; className?: string }) => (
  <div className={`${className}`}>{children}</div>
);

export const TableCell = ({ children, className = '' }: { children?: React.ReactNode; className?: string }) => (
  <div className={`p-2 ${className}`}>{children}</div>
);

export default Table;
