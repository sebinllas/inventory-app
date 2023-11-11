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
}

export const Button = ({
  children,
  className = '',
  type = 'button',
  styleType = ButtonType.primary,
  disabled = false,
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
			disabled={disabled}
      className={`${className} px-6 p-2 rounded-full font-bold
				${stylesClassName[styleType]} ${disabled && 'opacity-60'}
			`}
    >
      {children}
    </button>
  );
};
