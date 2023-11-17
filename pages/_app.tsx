import { MainLayout } from '@/components/layouts/MainLayout';
import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { Poppins } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  fallback: ['system-ui', 'arial'],
});

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <SessionProvider session={session}>
      <div className={`${poppins.className} h-full`}>
        <MainLayout excludedPages={['/']}>
          <Component {...pageProps} />
        </MainLayout>
        <Toaster position='top-left' />
      </div>
    </SessionProvider>
  );
};

export default App;
