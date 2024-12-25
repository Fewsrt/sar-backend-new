/*
  Warnings:

  - You are about to drop the column `branch_id` on the `supplier` table. All the data in the column will be lost.
  - You are about to drop the column `contact_person` on the `supplier` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `supplier` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `supplier` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `supplier` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "supplier" DROP CONSTRAINT "supplier_branch_id_fkey";

-- DropIndex
DROP INDEX "supplier_email_key";

-- DropIndex
DROP INDEX "supplier_phone_key";

-- AlterTable
ALTER TABLE "supplier" DROP COLUMN "branch_id",
DROP COLUMN "contact_person",
DROP COLUMN "email",
DROP COLUMN "phone",
DROP COLUMN "type",
ADD COLUMN     "branch_name" TEXT;
