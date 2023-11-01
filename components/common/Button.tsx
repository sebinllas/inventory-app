import React from 'react';

interface ButtonProps
	extends React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {}

export const Button = ({ children, className = '', ...rest }: ButtonProps) => {
	return (
		<button
			{...rest}
			className={`${className} px-6 p-2 bg-emerald-600 rounded-lg text-white font-bold`}>
			{children}
		</button>
	);
};
