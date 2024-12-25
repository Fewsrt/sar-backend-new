/*
  Warnings:

  - You are about to alter the column `code` on the `District` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(4)`.
  - You are about to alter the column `name_th` on the `District` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(150)`.
  - You are about to alter the column `name_en` on the `District` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(150)`.
  - You are about to alter the column `name` on the `Geography` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(150)`.
  - You are about to alter the column `code` on the `Province` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(2)`.
  - You are about to alter the column `name_th` on the `Province` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(150)`.
  - You are about to alter the column `name_en` on the `Province` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(150)`.
  - You are about to drop the column `districts_id` on the `Subdistrict` table. All the data in the column will be lost.
  - You are about to alter the column `name_th` on the `Subdistrict` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(150)`.
  - You are about to alter the column `name_en` on the `Subdistrict` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(150)`.

*/
-- DropForeignKey
ALTER TABLE "Subdistrict" DROP CONSTRAINT "Subdistrict_districts_id_fkey";

-- AlterTable
ALTER TABLE "District" ALTER COLUMN "code" SET DATA TYPE VARCHAR(4),
ALTER COLUMN "name_th" SET DATA TYPE VARCHAR(150),
ALTER COLUMN "name_en" SET DATA TYPE VARCHAR(150),
ALTER COLUMN "province_id" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Geography" ALTER COLUMN "name" SET DATA TYPE VARCHAR(150);

-- AlterTable
ALTER TABLE "Province" ALTER COLUMN "code" SET DATA TYPE VARCHAR(2),
ALTER COLUMN "name_th" SET DATA TYPE VARCHAR(150),
ALTER COLUMN "name_en" SET DATA TYPE VARCHAR(150),
ALTER COLUMN "geography_id" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Subdistrict" DROP COLUMN "districts_id",
ADD COLUMN     "district_id" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "name_th" SET DATA TYPE VARCHAR(150),
ALTER COLUMN "name_en" SET DATA TYPE VARCHAR(150);

-- AddForeignKey
ALTER TABLE "Subdistrict" ADD CONSTRAINT "Subdistrict_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "District"("id") ON DELETE CASCADE ON UPDATE CASCADE;
