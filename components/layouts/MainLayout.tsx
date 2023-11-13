import { Poppins } from 'next/font/google';
import React, { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { signIn, useSession } from 'next-auth/react';
import { Loading } from '@/components/common/Loading';
import { Button } from '@/components/common/Button';
import Image from 'next/image';
import { IconLogin2 } from '@tabler/icons-react';
import { usePathname } from 'next/navigation';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
});

enum AuthStatus {
  AUTHENTICATED = 'authenticated',
  UNAUTHENTICATED = 'unauthenticated',
  LOADING = 'loading',
}

export const MainLayout = ({
  children,
  excludedPages = [],
}: {
  children: ReactNode;
  excludedPages?: string[];
}) => {
  const pathname = usePathname();
  const { data, status } = useSession();

  if (excludedPages.includes(pathname)) return <main>{children}</main>;

  if (status == AuthStatus.LOADING)
    return (
      <main className='h-screen flex justify-center items-center'>
        <Loading />;
      </main>
    );
  if (status == AuthStatus.UNAUTHENTICATED)
    return (
      <main className='h-screen flex justify-center items-center'>
        <Home />;
      </main>
    );

  return (
    <div className={`${poppins.className} main-layout`}>
      {data && <Sidebar user={data.user!} />}
      <main>{children}</main>
    </div>
  );
};

const Home = () => {
  return (
    <div className='md:min-h-screen flex justify-center px-40 gap-10 items-center'>
      <Image
        src='/assets/images/landing-image.webp'
        width={500}
        height={500}
        alt='illustrative inventory management'
        className='rounded-full shrink '
      />
      <section>
        <h1 className='text-4xl lg:text-6xl font-bold '>
          Welcome to your{' '}
          <span className='text-emerald-600'>inventory management</span> app!
        </h1>
        <p className='mt-5 font-light text-slate-500'>
          Control your inventory, control your success.
        </p>
        <Button
          className='mt-10 p-3 flex gap-3'
          onClick={() => signIn('auth0')}
        >
          Login <IconLogin2 />
        </Button>
      </section>
    </div>
  );
};
