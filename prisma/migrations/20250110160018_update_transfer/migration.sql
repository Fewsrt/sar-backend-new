/*
  Warnings:

  - The `transfer_status` column on the `car` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "car" DROP COLUMN "transfer_status",
ADD COLUMN     "transfer_status" TEXT;
