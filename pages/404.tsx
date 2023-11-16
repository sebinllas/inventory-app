import { Button } from '@/components/common/Button';
import { IconArrowBack, IconGhost, IconHome } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import React from 'react';

export const Page404 = () => {
  const router = useRouter();
  return (
    <div className='flex items-center h-full justify-center min-h-screen'>
      <IconGhost
        className='text-emerald-600 inline'
        size={200}
        strokeWidth={1.4}
      />
      <div>
        <h1 className='text-4xl lg:text-6xl font-bold gap-6'>
          Error <span className='text-emerald-600'>404</span>
          <br /> Page not found
        </h1>
        <p className='mt-5 font-light text-slate-500'>
          We can&apos;t seem to find the page you are looking for
        </p>
        <div className='flex gap-4'>
          <Button className='mt-6 p-3 flex gap-3' onClick={() => router.back()}>
            Go Back <IconArrowBack />
          </Button>
          <Button
            className='mt-6 p-3 flex gap-3'
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
