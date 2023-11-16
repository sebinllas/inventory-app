import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { UserUpdate } from '@/types/user';
import { checkAuth } from '@/utils/auth';

enum AllowedMethods {
  PUT = 'PUT',
  DELETE = 'DELETE',
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await checkAuth(req, res, ['ADMIN']);
  const userId = req.query.userId as string;

  if (req.method === AllowedMethods.PUT) {
    const { role, ...user } = req.body as UserUpdate;
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...user,
        role: {
          connect: {
            name: role,
          },
        },
      },
    });
    return res.status(200).json(updatedUser);
  }

  if (req.method === AllowedMethods.DELETE) {
    const deletedUser = await prisma.user.delete({
      where: { id: userId },
    });
    return res.status(200).json(deletedUser);
  }

  return res.status(405).json({
    error: 'Method not allowed',
    allowedMethods: [Object.values(AllowedMethods)],
  });
};

export default handler;
