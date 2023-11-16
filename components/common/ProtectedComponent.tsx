import { AuthStatus } from '@/types/enums';
import { Enum_RoleName } from '@prisma/client';
import { useSession } from 'next-auth/react';
import React from 'react';

interface ProtectedComponentProps {
  allowedRoles?: Enum_RoleName[] | 'any';
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export const ProtectedComponent = ({
  allowedRoles = [Enum_RoleName.ADMIN],
  fallback = null,
  children,
}: ProtectedComponentProps) => {
  const { data, status } = useSession();
  if (status === AuthStatus.LOADING) return null;
  if (status === AuthStatus.UNAUTHENTICATED) return fallback;

  const userRole = data?.user?.role;
  if (allowedRoles === 'any') return children;
  if (userRole && allowedRoles.includes(userRole)) return children;
  return fallback;
};
