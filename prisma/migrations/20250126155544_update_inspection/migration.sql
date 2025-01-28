/*
  Warnings:

  - You are about to drop the column `created_at` on the `accounting` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `accounting` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `accounting` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `carInspection` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `carInspection` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `carInspection` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `customerPurchaseHistory` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `customerPurchaseHistory` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `customerPurchaseHistory` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `maintenance` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `maintenance` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `maintenance` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "accounting" DROP COLUMN "created_at",
DROP COLUMN "deleted_at",
DROP COLUMN "updated_at";

-- AlterTable
ALTER TABLE "carGeneralInfo" ADD COLUMN     "car_details_link" TEXT;

-- AlterTable
ALTER TABLE "carInspection" DROP COLUMN "created_at",
DROP COLUMN "deleted_at",
DROP COLUMN "updated_at";

-- AlterTable
ALTER TABLE "customerPurchaseHistory" DROP COLUMN "created_at",
DROP COLUMN "deleted_at",
DROP COLUMN "updated_at";

-- AlterTable
ALTER TABLE "maintenance" DROP COLUMN "created_at",
DROP COLUMN "deleted_at",
DROP COLUMN "updated_at";
