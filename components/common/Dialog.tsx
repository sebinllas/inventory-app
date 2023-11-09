import { ForwardedRef, forwardRef } from 'react';

interface DialogProps extends React.HTMLAttributes<HTMLDialogElement> {
  children: React.ReactNode;
}

const renderComponent = (
  { children, ...rest }: DialogProps,
  ref: ForwardedRef<HTMLDialogElement>
) => {
  return (
    <dialog className='dialog' ref={ref} {...rest}>
      {children}
    </dialog>
  );
};

export const Dialog = forwardRef(renderComponent);
