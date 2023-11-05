import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { checkReqQueryValue } from '@/utils/api';

enum AllowedMethods {
  GET = 'GET',
  POST = 'POST',
}
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === AllowedMethods.GET) {
    const query = req.query;
    const expandUser = checkReqQueryValue({
      param: 'expand',
      value: 'user',
      query,
    });
    const materials = await prisma.material.findMany({
      include: {
        createdBy: expandUser,
      },
    });
    return res.status(200).json(materials);
  }

  if (req.method === AllowedMethods.POST) {
    const { userId, ...material } = req.body;
    const createdMaterial = await prisma.material
      .create({
        data: {
          ...material,
          createdBy: {
            connect: {
              id: userId,
            },
          },
        },
      })
      .catch((error) => {
        if (error.code === 'P2002') {
          return res.status(409).json({
            details: `Material with name ${material.name} already exists`,
          });
        }
        return res.status(500).json({
          details: 'Something unexpected happened, please try again',
        });
      });
    return res.status(201).json(createdMaterial);
  }

  return res.status(405).json({
    error: 'Method not allowed',
    allowedMethods: [Object.values(AllowedMethods)],
  });
};

export default handler;
