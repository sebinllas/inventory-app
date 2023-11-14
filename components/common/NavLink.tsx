import Link from 'next/link';
import { ProtectedComponent } from './ProtectedComponent';
import { IconType } from '@/types/icon';

interface NavLinkProps {
  label: string;
  href: string;
  icon: IconType;
  isSelected?: boolean;
  protect?: boolean;
}
export const NavLink = ({
  label,
  href,
  isSelected,
  icon: Icon,
  protect,
}: NavLinkProps) => {
  return (
    <ProtectedComponent allowedRoles={protect ? ['ADMIN'] : 'any'}>
      <li key={label}>
        <Link
          href={href}
          className={`border-slate-300 border hover:bg-slate-100 
          rounded-full p-3 flex gap-3 font-bold ${
            isSelected && 'text-emerald-600 bg-slate-100'
          }`}
        >
          <Icon />
          {label}
        </Link>
      </li>
    </ProtectedComponent>
  );
};
