import React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  classNameInput?: string;
  classNameLabel?: string;
  classNameDiv?: string;
};

export const Input: React.FC<Props> = ({ label, classNameInput, classNameLabel, classNameDiv, ...props }) => {
  return (
    <div className={classNameDiv}>
      <label
        className={classNameLabel}
      >
        {label}
      </label>
      <input
        className={classNameInput}
        {...props}
      />
    </div>
  );
};