import React from 'react';

export const Chip = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={`px-2 inline-flex text-xs leading-5 font-semibold 
        rounded-full w-fit mt-1 text-gray-800} ${className}`}
    >
      {children}
    </span>
  );
};
