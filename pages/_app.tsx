import { Sidebar } from '@/components/layouts/Sidebar';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <div className={`${poppins.className} main-layout`}>
      <Sidebar />
      <Component {...pageProps} />
    </div>
  );
};

export default App;
