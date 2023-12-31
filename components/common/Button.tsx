import { IconLoader2 } from '@tabler/icons-react';
import React from 'react';

enum ButtonType {
  primary = 'primary',
  secondary = 'secondary',
}

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  styleType?: `${ButtonType}`;
  loading?: boolean;
}

export const Button = ({
  children,
  className = '',
  type = 'button',
  styleType = ButtonType.primary,
  disabled = false,
  loading = false,
  ...rest
}: ButtonProps) => {
  const stylesClassName = {
    [ButtonType.primary]: 'bg-emerald-600  text-white',
    [ButtonType.secondary]:
      'bg-white border border-emerald-600 text-emerald-600 ',
  };
  return (
    <button
      {...rest}
      type={type}
      disabled={disabled || loading}
      className={`${className} rounded-full p-2 px-6 font-bold disabled:opacity-60
				${stylesClassName[styleType]}
			`}
    >
      {loading ? (
        <div className='flex min-w-[60px] justify-center'>
          <IconLoader2 className='animate-spin' />
        </div>
      ) : (
        children
      )}
    </button>
  );
};
