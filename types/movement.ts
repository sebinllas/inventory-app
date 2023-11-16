import { InventoryMovement, User } from '@prisma/client';

export interface NewMovement {
  quantity: number;
  movementType: string;
  materialId: string;
}

export interface MovementResponse extends Omit<InventoryMovement, 'date'> {
  createdBy: User;
  date: string;
}
