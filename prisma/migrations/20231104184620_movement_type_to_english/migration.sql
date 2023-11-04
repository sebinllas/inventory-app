/*
  Warnings:

  - The values [ENTRADA,SALIDA] on the enum `Enum_MovementType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Enum_MovementType_new" AS ENUM ('IN', 'OUT');
ALTER TABLE "InventoryMovement" ALTER COLUMN "movementType" TYPE "Enum_MovementType_new" USING ("movementType"::text::"Enum_MovementType_new");
ALTER TYPE "Enum_MovementType" RENAME TO "Enum_MovementType_old";
ALTER TYPE "Enum_MovementType_new" RENAME TO "Enum_MovementType";
DROP TYPE "Enum_MovementType_old";
COMMIT;
