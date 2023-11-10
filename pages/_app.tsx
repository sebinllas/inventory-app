import { Sidebar } from '@/components/layouts/Sidebar';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <div className='main-layout'>
      <Sidebar />
      <Component {...pageProps} />
    </div>
  );
};

export default App;
