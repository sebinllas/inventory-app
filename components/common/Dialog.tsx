import { ReactNode } from 'react';
import { Button } from './Button';

interface DialogProps {
  children: React.ReactNode;
  open: boolean;
  confirmButton?: ReactNode;
  cancelButton?: ReactNode;
}

export const Dialog = ({
  children,
  open,
  confirmButton = null,
  cancelButton = null,
}: DialogProps) => {
  if (!open) return null;
  return (
    <div className='bg-black/20 fixed top-0 left-0 right-0 bottom-0 backdrop-blur-sm'>
      <dialog open={open} className='bg-white bottom-1/2 z-10'>
        {children}
        <div className='flex justify-evenly'>
          {confirmButton}
          {cancelButton}
        </div>
      </dialog>
    </div>
  );
};
