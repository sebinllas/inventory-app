import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

enum AllowedMethods {
	GET = 'GET',
	POST = 'POST',
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === AllowedMethods.GET) {
		const users = await prisma.user.findMany();
		return res.status(200).json(users);
	}

  if (req.method === AllowedMethods.POST) {
    const user = req.body;
    const createdUser = await prisma.user.create({ data: user });
    return res.status(201).json(createdUser);
  }


	return res
		.status(405)
		.json({
			error: 'Method not allowed',
			allowedMethods: [Object.values(AllowedMethods)],
		});
};

export default handler;
