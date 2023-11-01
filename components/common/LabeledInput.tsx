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
  ...rest
}: LabeledInputProps) => {
  return (
    <label className='flex flex-col'>
      <span>{label}</span>
      <input type={type} name={name} required={required} {...rest} className='rounded-lg bg-neutral-100 py-1 px-2'/>
    </label>
  );
};
