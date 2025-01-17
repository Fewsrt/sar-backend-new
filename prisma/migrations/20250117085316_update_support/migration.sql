/*
  Warnings:

  - The `transfer_status` column on the `carDocumentTracking` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "carDocumentTracking" DROP COLUMN "transfer_status",
ADD COLUMN     "transfer_status" TEXT;
