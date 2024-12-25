/*
  Warnings:

  - Added the required column `date` to the `car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `month` to the `car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "car" ADD COLUMN     "date" INTEGER NOT NULL,
ADD COLUMN     "month" INTEGER NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL;
