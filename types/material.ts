import { Material, User } from '@prisma/client';

export interface NewMaterial {
  name: string;
  quantity: number;
}

export interface MaterialResponse
  extends Omit<Material, 'createdAt' | 'updatedAt'> {
  createdAt: string;
  updatedAt: string;
  createdBy?: User;
}
