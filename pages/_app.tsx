import { MainLayout } from '@/components/layouts/MainLayout';
import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
});

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <SessionProvider session={session}>
      <div className={poppins.className}>
        <MainLayout excludedPages={['/']}>
          <Component {...pageProps} />
        </MainLayout>
      </div>
    </SessionProvider>
  );
};

export default App;
