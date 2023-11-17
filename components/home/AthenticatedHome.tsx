import { ProtectedComponent } from '@/components/common/ProtectedComponent';
import { InfoCard } from '@/components/common/InfoCard';
import { FeatureInfo } from '@/types/feature';

interface HomePageProps {
  features: FeatureInfo[];
}

export const AuthenticatedHome = ({ features }: HomePageProps) => {
  return (
    <div className='flex flex-col items-center justify-center gap-10 md:min-h-screen md:px-40'>
      <h1 className='mt-10 text-center text-3xl font-bold lg:text-6xl'>
        Welcome to your{' '}
        <span className='text-emerald-600'>inventory management</span> app!
      </h1>
      <p className='mt-5 font-light text-slate-500'>Manage your</p>
      <div className='flex flex-wrap items-stretch justify-center gap-8'>
        {features.map((item) => (
          <ProtectedComponent
            key={item.title}
            allowedRoles={item.protect ? ['ADMIN'] : 'any'}
          >
            <InfoCard
              title={item.title}
              href={item.href}
              icon={item.icon}
              image={item.image}
              description={item.description}
            />
          </ProtectedComponent>
        ))}
      </div>
    </div>
  );
};
