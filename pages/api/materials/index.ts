import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { checkReqQueryValue } from '@/utils/api';
import { Enum_MovementType } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

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
    return prisma
      .$transaction(async (tx) => {
        const createdMaterial = await tx.material.create({
          data: {
            ...material,
            createdBy: {
              connect: {
                id: userId,
              },
            },
          },
        });
        await tx.inventoryMovement.create({
          data: {
            material: {
              connect: {
                id: createdMaterial?.id,
              },
            },
            quantity: material.quantity,
            movementType: Enum_MovementType.IN,
            createdBy: {
              connect: {
                id: userId,
              },
            },
          },
        });
        return res.status(201).json(createdMaterial);
      })
      .catch((error) => {
        if (
          error instanceof PrismaClientKnownRequestError &&
          error.code === 'P2002'
        ) {
          return res.status(409).json({
            message: `Material with name ${material.name} already exists`,
          });
        }
        return res.status(500).json({
          message: 'Something unexpected happened, please try again',
        });
      });
  }

  return res.status(405).json({
    error: 'Method not allowed',
    allowedMethods: [Object.values(AllowedMethods)],
  });
};

export default handler;
