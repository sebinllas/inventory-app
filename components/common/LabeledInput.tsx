import React from 'react';

interface LabeledInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
}

export const LabeledInput = ({
  name,
  type,
  label,
  required,
  className = '',
  ...rest
}: LabeledInputProps) => {
  return (
    <label className={`flex flex-col ${className}`}>
      <span>{label}</span>
      <input
        type={type}
        name={name}
        required={required}
        {...rest}
        className='rounded-full bg-neutral-100 p-2'
      />
    </label>
  );
};
