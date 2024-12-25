/*
  Warnings:

  - You are about to alter the column `mileage` on the `car` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "car" ALTER COLUMN "mileage" SET DATA TYPE INTEGER;
