/*
  Warnings:

  - You are about to drop the column `day` on the `carGeneralInfo` table. All the data in the column will be lost.
  - You are about to drop the column `month` on the `carGeneralInfo` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `carGeneralInfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "car" ADD COLUMN     "day" INTEGER,
ADD COLUMN     "month" INTEGER,
ADD COLUMN     "year" INTEGER;

-- AlterTable
ALTER TABLE "carGeneralInfo" DROP COLUMN "day",
DROP COLUMN "month",
DROP COLUMN "year";
