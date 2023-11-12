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
      <div className='flex flex-col gap-2 p-4 md:sticky top-0 left-0 max-h-screen overflow-y-auto'>
        <div className='text-neutral-700 flex flex-col gap-2 rounded-lg items-center mt-2 w-full'>
          <div
            className='bg-slate-200 rounded-full w-24 h-24 overflow-hidden 
            flex justify-center self-center'
          >
            <IconUserFilled size={120} />
          </div>
          <p className='text-center font-light w-full text-slate-500'>
            {user.name}
          </p>
          <Button className='whitespace-nowrap md:w-full flex gap-3 p-3'>
            <IconLogout2 /> Logout
          </Button>
        </div>
        <ul className='flex md:flex-col justify-center gap-4 py-4'>
          {links.map(({ label, href, icon: Icon }) => (
            <li key={label}>
              <Link
                href={href}
                className={`border-slate-300 border hover:bg-slate-100 
                rounded-full p-3 flex gap-3 font-bold ${
                  pathname === href && 'text-emerald-600 bg-slate-100'
                }`}
              >
                <Icon />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};
