import React from 'react';

export const Loading = ({ className = '' }: { className?: string }) => {
  return (
    <div
      className={`${className} w-20 h-20 mx-auto my-10 border-emerald-600 border-8 
      border-r-gray-500/50 rounded-full animate-spin`}
    ></div>
  );
};
