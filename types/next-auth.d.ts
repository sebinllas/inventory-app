import { Enum_RoleName } from '@prisma/client';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface SessionUser extends AdapterUser {
    id: string | null | undefined;
    role: Enum_RoleName | null | undefined;
  }
  interface Session {
    user: SessionUser;
  }
}
