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
      className={`text-gray-800} mt-1 inline-flex w-fit rounded-full 
        px-2 text-xs font-semibold leading-5 ${className}`}
    >
      {children}
    </span>
  );
};
