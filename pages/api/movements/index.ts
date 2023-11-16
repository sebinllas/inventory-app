import { checkReqQueryValue } from '@/utils/api';
import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { Enum_MovementType } from '@prisma/client';
import { checkAuth } from '@/utils/auth';

enum AllowedMethods {
  GET = 'GET',
  POST = 'POST',
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await checkAuth(req, res, ['ADMIN', 'USER']);

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
    const materialUpdateOperation =
      movement.movementType === Enum_MovementType.IN
        ? 'increment'
        : 'decrement';

    return await prisma.$transaction(async (tx) => {
      const material = await tx.material.findUnique({
        where: {
          id: materialId,
        },
      });
      if (!material) {
        return res.status(404).json({
          message: 'Material with not found',
        });
      }
      if (
        movement.movementType === Enum_MovementType.OUT &&
        movement.quantity > material.quantity
      ) {
        return res.status(400).json({
          message: 'Material has insufficient quantity for this movement',
        });
      }

      const createdMovement = await tx.inventoryMovement.create({
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
      await tx.material.update({
        where: {
          id: materialId,
        },
        data: {
          quantity: {
            [materialUpdateOperation]: movement.quantity,
          },
        },
      });
      return res.status(201).json(createdMovement);
    });
  }

  return res.status(405).json({
    error: 'Method not allowed',
    allowedMethods: [Object.values(AllowedMethods)],
  });
};

export default handler;
