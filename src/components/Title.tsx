import React from 'react';

interface Props {
  title: string;
}

export const Title: React.FC<Props> = ({ title }) => {
  return (
    <h1 className="text-2xl font-bold mb-6">{title}</h1>
  );
};