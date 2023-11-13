import { MainLayout } from '@/components/layouts/MainLayout';
import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <SessionProvider session={session}>
      <MainLayout excludedPages={['/']}>
        <Component {...pageProps} />
      </MainLayout>
    </SessionProvider>
  );
};

export default App;
