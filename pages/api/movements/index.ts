import { checkReqQueryValue } from '@/utils/api';
import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

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

    const { material } = req.query;
    const isValidMaterialId = typeof material === 'string';

    const movements = await prisma.inventoryMovement.findMany({
      include: {
        createdBy: expandUser,
      },
      where: {
        materialId: isValidMaterialId ? material : undefined,
      },
    });
    return res.status(200).json(movements);
  }

  if (req.method === AllowedMethods.POST) {
    const { userId, materialId, ...movement } = req.body;
    const createdMovement = await prisma.inventoryMovement.create({
      data: {
        ...movement,
        material: {
          connect: {
            id: materialId,
          },
        },
        createdBy: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return res.status(201).json(createdMovement);
  }

  return res.status(405).json({
    error: 'Method not allowed',
    allowedMethods: [Object.values(AllowedMethods)],
  });
};

export default handler;
