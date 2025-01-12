/*
  Warnings:

  - The `car_tracking` column on the `car` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "car" DROP COLUMN "car_tracking",
ADD COLUMN     "car_tracking" TEXT;
