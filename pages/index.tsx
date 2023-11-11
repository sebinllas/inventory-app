import { Button } from '@/components/common/Button';
import { IconLogin2 } from '@tabler/icons-react';
import Image from 'next/image';

const Home = () => {
  return (
    <main className='h-screen w-full flex items-center justify-center'>
      <div className='flex justify-center px-40 gap-10 items-center'>
        <section>
          <h1 className='text-6xl font-bold '>
            Welcome to your{' '}
            <span className='text-emerald-600'>inventory management</span> app!
          </h1>
          <p className='mt-5 font-light text-slate-500'>
            Control your inventory, control your success.
          </p>
          <Button className='mt-10 p-3 flex gap-3'>
            Login <IconLogin2 />
          </Button>
        </section>
        <Image
          src='/assets/landing-image.jpeg'
          width={500}
          height={500}
          alt='illustrative inventory management'
          className='rounded-full'
        />
      </div>
    </main>
  );
};

export default Home;
