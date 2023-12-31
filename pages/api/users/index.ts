import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { UserResponse } from '@/types/user';
import { checkAuth } from '@/utils/auth';

enum AllowedMethods {
  GET = 'GET',
  POST = 'POST',
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await checkAuth(req, res, ['ADMIN']);

  if (req.method === AllowedMethods.GET) {
    if (req.query['email']) {
      const email = req.query['email'] as string;
      const user = await prisma.$queryRaw<UserResponse[]>`
        SELECT u.* , r."name" AS "role"
        FROM "User" u
        FULL OUTER JOIN "Role" r
        ON r.id  = u."roleId"
        WHERE u.id IS NOT NULL AND u.email = ${email}
        ORDER BY r.id
    `;
      if (user.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json(user[0]);
    }
    const users = await prisma.$queryRaw<UserResponse[]>`
    		SELECT u.* , r."name" AS "role"
    		FROM "User" u
    		FULL OUTER JOIN "Role" r
    		ON r.id  = u."roleId"
        WHERE u.id IS NOT NULL
        ORDER BY r.id
    	`;
    return res.status(200).json(users);
  }

  if (req.method === AllowedMethods.POST) {
    const user = req.body;
    const createdUser = await prisma.user.create({ data: user });
    return res.status(201).json(createdUser);
  }

  return res.status(405).json({
    error: 'Method not allowed',
    allowedMethods: [Object.values(AllowedMethods)],
  });
};

export default handler;
