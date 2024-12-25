/*
  Warnings:

  - Added the required column `parking_id` to the `car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "car" ADD COLUMN     "parking_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "car" ADD CONSTRAINT "car_parking_id_fkey" FOREIGN KEY ("parking_id") REFERENCES "branch"("branch_id") ON DELETE RESTRICT ON UPDATE CASCADE;
