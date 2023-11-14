import {
  IconPackages,
  IconSwitchVertical,
  IconUsers,
} from '@tabler/icons-react';

import { useSession } from 'next-auth/react';
import { Loading } from '@/components/common/Loading';
import { UnauthenticatedHome } from '@/components/home/UnathenticatedHome';
import { AuthenticatedHome } from '@/components/home/AthenticatedHome';
import { AuthStatus } from '@/types/enums';
import { MainLayout } from '@/components/layouts/MainLayout';

const features = [
  {
    title: 'Materials',
    href: '/materials',
    icon: IconPackages,
    image: '/assets/images/materials-image.webp',
    description:
      'Explore the materials page to view all its related information and manage them.',
  },
  {
    title: 'Users',
    href: '/users',
    icon: IconUsers,
    image: '/assets/images/users-image.webp',
    protect: true,
    description:
      'Access the users page to manage and view information about users using the inventory system.',
  },
  {
    title: 'Inventory',
    href: '/inventory',
    icon: IconSwitchVertical,
    image: '/assets/images/movements-image.webp',
    description:
      'Visit the inventory page to monitor and control the materials movements.',
  },
];

const Home = () => {
  const { status } = useSession();
  if (status === AuthStatus.LOADING) {
    return <LoadingHome />;
  }
  if (status === AuthStatus.AUTHENTICATED) {
    return (
      <MainLayout>
        <AuthenticatedHome features={features} />;
      </MainLayout>
    );
  }
  return <UnauthenticatedHome features={features} />;
};

export default Home;

const LoadingHome = () => {
  return (
    <main className='h-screen flex justify-center items-center'>
      <Loading />
    </main>
  );
};
