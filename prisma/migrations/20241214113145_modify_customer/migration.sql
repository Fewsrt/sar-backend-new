/*
  Warnings:

  - The `customer_id` column on the `car` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `customer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `customer_id` column on the `customer` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[customer_code]` on the table `customer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customer_code` to the `customer` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `customer_id` on the `customerPurchaseHistory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `customer_id` on the `followUp` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `customer_id` on the `reservation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `customer_id` on the `sale` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `customer_id` on the `taxInvoice` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "car" DROP CONSTRAINT "car_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "customerPurchaseHistory" DROP CONSTRAINT "customerPurchaseHistory_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "followUp" DROP CONSTRAINT "followUp_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "reservation" DROP CONSTRAINT "reservation_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "sale" DROP CONSTRAINT "sale_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "taxInvoice" DROP CONSTRAINT "taxInvoice_customer_id_fkey";

-- AlterTable
ALTER TABLE "car" DROP COLUMN "customer_id",
ADD COLUMN     "customer_id" INTEGER;

-- AlterTable
ALTER TABLE "customer" DROP CONSTRAINT "customer_pkey",
ADD COLUMN     "customer_code" TEXT NOT NULL,
DROP COLUMN "customer_id",
ADD COLUMN     "customer_id" SERIAL NOT NULL,
ADD CONSTRAINT "customer_pkey" PRIMARY KEY ("customer_id");

-- AlterTable
ALTER TABLE "customerPurchaseHistory" DROP COLUMN "customer_id",
ADD COLUMN     "customer_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "followUp" DROP COLUMN "customer_id",
ADD COLUMN     "customer_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "reservation" DROP COLUMN "customer_id",
ADD COLUMN     "customer_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "sale" DROP COLUMN "customer_id",
ADD COLUMN     "customer_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "taxInvoice" DROP COLUMN "customer_id",
ADD COLUMN     "customer_id" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "car_customer_id_idx" ON "car"("customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "customer_customer_code_key" ON "customer"("customer_code");

-- CreateIndex
CREATE INDEX "followUp_customer_id_idx" ON "followUp"("customer_id");

-- AddForeignKey
ALTER TABLE "followUp" ADD CONSTRAINT "followUp_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car" ADD CONSTRAINT "car_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("customer_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservation" ADD CONSTRAINT "reservation_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale" ADD CONSTRAINT "sale_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customerPurchaseHistory" ADD CONSTRAINT "customerPurchaseHistory_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "taxInvoice" ADD CONSTRAINT "taxInvoice_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;
