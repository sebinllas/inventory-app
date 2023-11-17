import React from 'react';

export const Loading = ({ className = '' }: { className?: string }) => {
  return (
    <div
      className={`${className} mx-auto my-10 h-20 w-20 animate-spin rounded-full 
      border-8 border-emerald-600 border-r-gray-500/50`}
    ></div>
  );
};
