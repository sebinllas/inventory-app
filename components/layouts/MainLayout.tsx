import React, { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { useSession } from 'next-auth/react';
import { Loading } from '@/components/common/Loading';
import { useRouter } from 'next/router';
import { AuthStatus } from '@/types/enums';

export const MainLayout = ({
  children,
  excludedPages = [],
}: {
  children: ReactNode;
  excludedPages?: string[];
}) => {
  const router = useRouter();
  const pathname = router.pathname;
  const { data, status } = useSession();

  if (excludedPages.includes(pathname)) return children;

  if (status == AuthStatus.LOADING)
    return (
      <main className='flex h-screen items-center justify-center'>
        <Loading />
      </main>
    );

  return (
    <div className='main-layout'>
      {data && <Sidebar user={data.user!} />}
      <main>{children}</main>
    </div>
  );
};
