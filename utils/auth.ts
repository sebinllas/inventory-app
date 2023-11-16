import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { Enum_RoleName } from '@prisma/client';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

type EndpointAllowedRoles = Enum_RoleName[];

export const checkAuth = async (
  req: NextApiRequest,
  res: NextApiResponse,
  allowedRoles: EndpointAllowedRoles = ['ADMIN']
) => {
  const session = await getServerSession(req, res, authOptions);

  if (session?.user.role) {
    if (allowedRoles.includes(session.user.role)) {
      return session.user.role;
    }
    return res.status(403).json({ message: 'Forbidden' });
  }
  return res.status(401).json({ message: 'Unauthorized' });
};
