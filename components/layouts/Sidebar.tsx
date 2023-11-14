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
  {
    label: 'Inventory',
    href: '/inventory',
    icon: IconSwitchVertical,
  },
];

interface SidebarProps {
  user: NonNullable<Session['user']>;
}

export const Sidebar = ({ user }: SidebarProps) => {
  const pathname = usePathname();
  return (
    <aside className='relative md:min-h-screen'>
      <div className='flex flex-col gap-2 p-4 md:sticky top-0 left-0 max-h-screen overflow-y-auto'>
        <div className='text-neutral-700 flex flex-col gap-2 rounded-lg items-center mt-2 w-full'>
          {user.name ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user?.image || ''}
              className='bg-slate-200 rounded-full w-24 h-24 ring-2 ring-emerald-500 ring-offset-2 ring-offset-white'
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
