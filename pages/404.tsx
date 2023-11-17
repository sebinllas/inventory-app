import { Button } from '@/components/common/Button';
import { IconArrowBack, IconGhost, IconHome } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import React from 'react';

export const Page404 = () => {
  const router = useRouter();
  return (
    <div className='flex h-full min-h-screen items-center justify-center'>
      <IconGhost
        className='inline text-emerald-600'
        size={200}
        strokeWidth={1.4}
      />
      <div>
        <h1 className='gap-6 text-4xl font-bold lg:text-6xl'>
          Error <span className='text-emerald-600'>404</span>
          <br /> Page not found
        </h1>
        <p className='mt-5 font-light text-slate-500'>
          We can&apos;t seem to find the page you are looking for
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

export default Page404;
