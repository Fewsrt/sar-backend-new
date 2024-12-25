/*
  Warnings:

  - The `status` column on the `car` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `transfer_status` column on the `car` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `car_tracking` column on the `car` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `updated_at` to the `car` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "carStatus" AS ENUM ('available', 'reserved', 'sold', 'maintenance', 'pending');

-- CreateEnum
CREATE TYPE "transferStatus" AS ENUM ('pending', 'in_progress', 'completed', 'cancelled');

-- CreateEnum
CREATE TYPE "trackingStatus" AS ENUM ('pending', 'following_up', 'completed', 'cancelled');

-- AlterTable
ALTER TABLE "car" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "carStatus" NOT NULL DEFAULT 'available',
DROP COLUMN "transfer_status",
ADD COLUMN     "transfer_status" "transferStatus" DEFAULT 'pending',
DROP COLUMN "car_tracking",
ADD COLUMN     "car_tracking" "trackingStatus" DEFAULT 'pending';

-- CreateIndex
CREATE INDEX "car_car_code_idx" ON "car"("car_code");
