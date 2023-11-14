import { ProtectedComponent } from '@/components/common/ProtectedComponent';
import { InfoCard } from '@/components/common/InfoCard';
import { FeatureInfo } from '@/types/feature';

interface HomePageProps {
  features: FeatureInfo[];
}

export const AuthenticatedHome = ({ features }: HomePageProps) => {
  return (
    <div className='md:min-h-screen flex flex-col justify-center px-40 gap-10 items-center'>
      <h1 className='text-3xl lg:text-6xl font-bold text-center mt-4'>
        Welcome to your{' '}
        <span className='text-emerald-600'>inventory management</span> app!
      </h1>
      <p className='mt-5 font-light text-slate-500'>Manage your</p>
      <div className='flex flex-wrap gap-8 justify-center items-stretch'>
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
