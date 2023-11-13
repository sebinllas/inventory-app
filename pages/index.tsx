import {
  IconPackages,
  IconSwitchVertical,
  IconUsers,
  TablerIconsProps,
} from '@tabler/icons-react';
import Link from 'next/link';
import Image from 'next/image';

const links = [
  {
    label: 'Materials',
    href: '/materials',
    icon: IconPackages,
    image: '/assets/images/materials-image.webp',
    description:
      'Explore the materials page to view all its related information and manage them.',
  },
  {
    label: 'Users',
    href: '/users',
    icon: IconUsers,
    image: '/assets/images/users-image.webp',
    description:
      'Access the users page to manage and view information about users using the inventory system.',
  },
  {
    label: 'Inventory',
    href: '/inventory',
    icon: IconSwitchVertical,
    image: '/assets/images/movements-image.webp',
    description:
      'Visit the inventory page to monitor and control the materials movements.',
  },
];

const Home = () => {
  return (
    <div className='md:min-h-screen flex flex-col justify-center px-40 gap-10 items-center'>
      <h1 className='text-4xl lg:text-6xl font-bold text-center'>
        Welcome to your{' '}
        <span className='text-emerald-600'>inventory management</span> app!
      </h1>
      <div className='flex flex-wrap gap-8 justify-center items-stretch'>
        {links.map(({ label, href, icon: Icon, image, description }) => (
          <IconsCard
            key={label}
            href={href}
            title={label}
            icon={Icon}
            image={image}
            description={description}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;

type IconType = (props: TablerIconsProps) => JSX.Element;

const IconsCard = ({
  title,
  icon: Icon,
  description,
  href,
  image,
}: {
  title: string;
  icon: IconType;
  description: string;
  href: string;
  image: string;
}) => {
  return (
    <Link href={href}>
      <article
        className='border border-slate-300 rounded-lg bg-neutral-100 
        transition-transform overflow-hidden h-full flex flex-col w-64
        hover:scale-105'
      >
        <Image
          src={image}
          alt={title}
          width={256}
          height={256}
          className='rounded-lg shadow-md'
        />
        <div className='p-4 flex flex-col justify-center'>
          <h3 className='flex gap-3 items-center font-bold text-lg'>
            <span className='text-emerald-600 bg-emerald-600/20 rounded-full p-2 text-xl'>
              {<Icon />}
            </span>
            {title}
          </h3>
          <p className='font-light text-neutral-700 text-sm mt-2'>
            {description}
          </p>
        </div>
      </article>
    </Link>
  );
};
