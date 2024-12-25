/*
  Warnings:

  - You are about to drop the column `address` on the `supplier` table. All the data in the column will be lost.
  - You are about to drop the column `district_id` on the `supplier` table. All the data in the column will be lost.
  - You are about to drop the column `postal_code` on the `supplier` table. All the data in the column will be lost.
  - You are about to drop the column `province_id` on the `supplier` table. All the data in the column will be lost.
  - You are about to drop the column `subdistrict_id` on the `supplier` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "supplier" DROP CONSTRAINT "supplier_district_id_fkey";

-- DropForeignKey
ALTER TABLE "supplier" DROP CONSTRAINT "supplier_province_id_fkey";

-- DropForeignKey
ALTER TABLE "supplier" DROP CONSTRAINT "supplier_subdistrict_id_fkey";

-- AlterTable
ALTER TABLE "supplier" DROP COLUMN "address",
DROP COLUMN "district_id",
DROP COLUMN "postal_code",
DROP COLUMN "province_id",
DROP COLUMN "subdistrict_id";
