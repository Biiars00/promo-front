import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

export const Button: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <button
      className={className}
      {...props}
    >
      {children}
    </button>
  );
};