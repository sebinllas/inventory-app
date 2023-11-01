import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

enum AllowedMethods {
	PUT = 'PUT',
	DELETE = 'DELETE',
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const materialId = req.query.materialId as string;

	if (req.method === AllowedMethods.PUT) {
		const material = req.body;
		const updatedMaterial = await prisma.material.update({
			where: { id: materialId },
			data: material,
		});
		return res.status(200).json(updatedMaterial);
	}

	if (req.method === AllowedMethods.DELETE) {
		const deletedMaterial = await prisma.material.delete({
			where: { id: materialId },
		});
		return res.status(200).json(deletedMaterial);
	}

	return res.status(405).json({
		error: 'Method not allowed',
		allowedMethods: [Object.values(AllowedMethods)],
	});
};

export default handler;