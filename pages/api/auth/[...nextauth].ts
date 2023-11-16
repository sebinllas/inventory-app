import prisma from '@/lib/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { User } from '@prisma/client';
import { NextAuthOptions, Session } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import NextAuth from 'next-auth/next';
import Auth0Provider from 'next-auth/providers/auth0';

type SessionCallbackType = (params: {
  session: Session;
  user: AdapterUser;
}) => Promise<Session>;

const sessionCallback: SessionCallbackType = async ({ session, user }) => {
  const currentUser = user as User;
  const role = currentUser.roleId
    ? await prisma.role.findUnique({
        where: { id: currentUser.roleId },
      })
    : null;
  return {
    ...session,
    user: {
      ...session.user,
      id: currentUser.id,
      role: role?.name ?? null,
    },
  };
};

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: sessionCallback,
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID || '',
      clientSecret: process.env.AUTH0_CLIENT_SECRET || '',
      issuer: process.env.AUTH0_ISSUER || '',
    }),
  ],
};

export default NextAuth(authOptions);
