/*
  Warnings:

  - You are about to drop the column `invoice_type` on the `taxInvoice` table. All the data in the column will be lost.
  - You are about to drop the column `sale_price_before_vat` on the `taxInvoice` table. All the data in the column will be lost.
  - You are about to drop the column `sale_price_incl_vat` on the `taxInvoice` table. All the data in the column will be lost.
  - You are about to drop the column `vat_7_percent` on the `taxInvoice` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[invoice_no]` on the table `taxInvoice` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `car_code` to the `taxInvoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `car_id` to the `taxInvoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_code` to the `taxInvoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_tax_id` to the `taxInvoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invoice_no` to the `taxInvoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price_before_vat` to the `taxInvoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_price` to the `taxInvoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `taxInvoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vat_amount` to the `taxInvoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "taxInvoice" DROP COLUMN "invoice_type",
DROP COLUMN "sale_price_before_vat",
DROP COLUMN "sale_price_incl_vat",
DROP COLUMN "vat_7_percent",
ADD COLUMN     "car_code" TEXT NOT NULL,
ADD COLUMN     "car_id" INTEGER NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "customer_code" TEXT NOT NULL,
ADD COLUMN     "customer_tax_id" TEXT NOT NULL,
ADD COLUMN     "invoice_no" TEXT NOT NULL,
ADD COLUMN     "price_before_vat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "total_price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "vat_amount" DOUBLE PRECISION NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "taxInvoice_invoice_no_key" ON "taxInvoice"("invoice_no");

-- AddForeignKey
ALTER TABLE "taxInvoice" ADD CONSTRAINT "taxInvoice_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "car"("car_id") ON DELETE RESTRICT ON UPDATE CASCADE;
