import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { Button } from '@/components/common/Button';
import { IconChevronDown, IconLogin2 } from '@tabler/icons-react';
import { InfoCard } from '@/components/common/InfoCard';
import { FeatureInfo } from '@/types/feature';

interface HomePageProps {
  features: FeatureInfo[];
}

export const UnauthenticatedHome = ({ features }: HomePageProps) => {
  return (
    <main>
      <section className='flex min-h-screen md:flex-row flex-col  justify-center px-40 gap-10 items-center relative'>
        <Image
          priority
          src='/assets/images/landing-image.webp'
          width={500}
          height={500}
          alt='illustrative inventory management'
          className='rounded-full shrink min-w-[250px]'
        />
        <div>
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
        </div>
        <button
          className='absolute bottom-0 left-1/2 -translate-x-1/2 animate-bounce opacity-40'
          onClick={(e) => {
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
            e.currentTarget.remove();
          }}
          aria-label='scroll down'
        >
          <IconChevronDown size={50} />
        </button>
      </section>
      <section className='flex flex-col gap-8 justify-center items-center'>
        <p className='mt-5 font-light text-slate-500'>
          Here you can manage your
        </p>
        <div className='flex justify-center flex-wrap gap-8 mb-40'>
          {features.map((item) => (
            <InfoCard
              key={item.title}
              title={item.title}
              icon={item.icon}
              image={item.image}
              description={item.description}
            />
          ))}
        </div>
      </section>
    </main>
  );
};
