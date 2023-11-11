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
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Enum_RoleName } from '@prisma/client';

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

export const Sidebar = () => {
  const pathname = usePathname();
  const user = {
    role: Enum_RoleName.ADMIN,
    name: 'Sebastián Suárez Ramírez',
    email: 'sebastian.suarezr@udea.edu.co',
  };
  return (
    <aside className='relative'>
      <div className='flex flex-col gap-4 px-4 fixed'>
        <div className='text-neutral-700 p-3 flex flex-col gap-2 border-slate-300 border rounded-lg items-center'>
          <div
            className='bg-slate-200 rounded-full w-24 h-24 overflow-hidden 
          flex justify-center self-center'
          >
            <IconUserFilled size={120} />
          </div>
          <p className='text-center font-light w-full text-slate-500'>
            {user.name}
          </p>
        </div>
        <Button className='whitespace-nowrap flex gap-3 p-3'>
          <IconLogout2 /> Logout
        </Button>
        {links.map(({ label, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className={`border-slate-300 border hover:bg-slate-100 
            rounded-lg p-3 flex gap-3 font-bold ${
              pathname === href && 'text-emerald-600 bg-slate-100'
            }`}
          >
            <Icon />
            {label}
          </Link>
        ))}
      </div>
    </aside>
  );
};
