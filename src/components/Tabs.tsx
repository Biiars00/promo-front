import React from 'react';
import clsx from 'clsx';

interface Props {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}

export const Tabs: React.FC<Props> = ({ options, selected, onSelect }) => {
  return (
    <div className="flex border rounded overflow-hidden">
      {options.map(option => (
        <button
          key={option}
          onClick={() => onSelect(option)}
          className={clsx(
            'flex-1 px-4 py-2 text-sm font-medium',
            selected === option ? 'bg-gray-900 text-white' : 'bg-white text-gray-700',
            'transition-colors'
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
};