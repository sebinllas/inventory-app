import { SelectHTMLAttributes } from 'react';

interface LabeledSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
}

export const LabeledSelect = ({
  children,
  className = '',
  label,
  defaultValue,
  ...rest
}: LabeledSelectProps) => {
  return (
    <label className='flex flex-col'>
      <span>{label}</span>
      <select
        defaultValue={defaultValue}
        className={`${className} rounded-lg bg-neutral-100 p-2`}
        {...rest}
      >
        {children}
      </select>
    </label>
  );
};
