import { Button } from '@/components/common/Button';
import { IconArrowBack, IconHome, IconLock } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import React from 'react';

export const Page401 = () => {
  const router = useRouter();

  return (
    <div className='flex h-full min-h-screen items-center justify-center'>
      <IconLock
        className='inline text-emerald-600'
        size={200}
        strokeWidth={1.4}
      />
      <div>
        <h1 className='gap-6 text-4xl font-bold lg:text-6xl'>
          Error <span className='text-emerald-600'>401</span>
          <br /> Access denied
        </h1>
        <p className='mt-5 font-light text-slate-500'>
          The page you are trying to access has restricted access
        </p>
        <div className='flex gap-4'>
          <Button className='mt-6 flex gap-3 p-3' onClick={() => router.back()}>
            Go Back <IconArrowBack />
          </Button>
          <Button
            className='mt-6 flex gap-3 p-3'
            styleType='secondary'
            onClick={() => router.replace('/')}
          >
            Go Home <IconHome />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page401;
