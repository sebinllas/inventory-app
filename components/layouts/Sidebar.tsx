import React from 'react';
import { Button } from '@/components/common/Button';
import {
  IconHome,
  IconLogout2,
  IconPackages,
  IconSwitchVertical,
  IconUserFilled,
  IconUsers,
} from '@tabler/icons-react';
import { usePathname } from 'next/navigation';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import { NavLink } from '@/components/common/NavLink';

const links = [
  {
    label: 'Home',
    href: '/',
    icon: IconHome,
  },
  {
    label: 'Inventory',
    href: '/inventory',
    icon: IconSwitchVertical,
  },
  {
    label: 'Users',
    href: '/users',
    icon: IconUsers,
    protect: true,
  },
  {
    label: 'Materials',
    href: '/materials',
    icon: IconPackages,
  },
];

interface SidebarProps {
  user: NonNullable<Session['user']>;
}

export const Sidebar = ({ user }: SidebarProps) => {
  const pathname = usePathname();
  return (
    <aside className='relative h-full bg-gray-100'>
      <div className='left-0 top-0 flex h-full max-h-screen flex-col-reverse gap-2 overflow-y-auto p-4 md:sticky md:top-0 md:flex-col'>
        <div className='flex h-full flex-col justify-center'>
          <SessionInfo user={user} />
          <ul className='flex justify-center gap-4 py-4 md:flex-col'>
            {links.map((link) => (
              <NavLink
                key={link.label}
                isSelected={pathname == link.href}
                {...link}
              />
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};

const DefaultUserAvatar = () => (
  <div className='flex h-24 w-24 justify-center self-center overflow-hidden rounded-full bg-slate-200'>
    <IconUserFilled size={120} />
  </div>
);

const SessionInfo = ({ user }: { user: NonNullable<Session['user']> }) => {
  return (
    <div className='mt-2 flex w-full flex-col items-center gap-2 rounded-lg text-neutral-700'>
      {user.name ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={user?.image || ''}
          alt={`${user.name} avatar`}
          className='h-24 w-24 rounded-full bg-slate-200 ring-2 ring-emerald-500 ring-offset-2 ring-offset-white'
        />
      ) : (
        <DefaultUserAvatar />
      )}
      <p className='w-full text-center font-light text-slate-500'>
        {user.name}
      </p>
      <Button
        className='flex gap-3 whitespace-nowrap p-3 md:w-full'
        onClick={() => signOut()}
      >
        <IconLogout2 /> Logout
      </Button>
    </div>
  );
};
