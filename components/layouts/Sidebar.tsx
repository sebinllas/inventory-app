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
      <div className='flex flex-col-reverse md:flex-col md:top-0 gap-2 p-4 md:sticky top-0 left-0 max-h-screen overflow-y-auto h-full'>
        <div className='flex flex-col justify-center h-full'>
          <SessionInfo user={user} />
          <ul className='flex md:flex-col justify-center gap-4 py-4'>
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
  <div
    className='bg-slate-200 rounded-full w-24 h-24 overflow-hidden 
  flex justify-center self-center'
  >
    <IconUserFilled size={120} />
  </div>
);

const SessionInfo = ({ user }: { user: NonNullable<Session['user']> }) => {
  return (
    <div className='text-neutral-700 flex flex-col gap-2 rounded-lg items-center mt-2 w-full'>
      {user.name ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={user?.image || ''}
          className='bg-slate-200 rounded-full w-24 h-24 ring-2 
            ring-emerald-500 ring-offset-2 ring-offset-white'
          alt={`${user.name} avatar`}
        />
      ) : (
        <DefaultUserAvatar />
      )}
      <p className='text-center font-light w-full text-slate-500'>
        {user.name}
      </p>
      <Button
        className='whitespace-nowrap md:w-full flex gap-3 p-3'
        onClick={() => signOut()}
      >
        <IconLogout2 /> Logout
      </Button>
    </div>
  );
};
