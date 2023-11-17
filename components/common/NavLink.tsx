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
          className={`flex gap-3 rounded-full 
          border border-slate-300 p-3 font-bold hover:bg-slate-100 ${
            isSelected && 'bg-slate-100 text-emerald-600'
          }`}
        >
          <Icon />
          {label}
        </Link>
      </li>
    </ProtectedComponent>
  );
};
