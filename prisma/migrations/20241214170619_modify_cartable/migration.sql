/*
  Warnings:

  - You are about to drop the column `date` on the `car` table. All the data in the column will be lost.
  - You are about to drop the column `financing` on the `car` table. All the data in the column will be lost.
  - You are about to drop the column `fp` on the `car` table. All the data in the column will be lost.
  - You are about to drop the column `income_date` on the `car` table. All the data in the column will be lost.
  - You are about to drop the column `month` on the `car` table. All the data in the column will be lost.
  - You are about to drop the column `new_registration_no` on the `car` table. All the data in the column will be lost.
  - You are about to drop the column `new_registration_province` on the `car` table. All the data in the column will be lost.
  - You are about to drop the column `registration_no` on the `car` table. All the data in the column will be lost.
  - You are about to drop the column `registration_province` on the `car` table. All the data in the column will be lost.
  - You are about to drop the column `release_date` on the `car` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `car` table. All the data in the column will be lost.
  - You are about to drop the `carFinancialDetails` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "car" DROP CONSTRAINT "car_brand_id_fkey";

-- DropForeignKey
ALTER TABLE "car" DROP CONSTRAINT "car_color_id_fkey";

-- DropForeignKey
ALTER TABLE "car" DROP CONSTRAINT "car_model_id_fkey";

-- DropForeignKey
ALTER TABLE "car" DROP CONSTRAINT "car_submodel_id_fkey";

-- DropForeignKey
ALTER TABLE "carFinancialDetails" DROP CONSTRAINT "carFinancialDetails_car_id_fkey";

-- DropIndex
DROP INDEX "car_registration_no_key";

-- AlterTable
ALTER TABLE "car" DROP COLUMN "date",
DROP COLUMN "financing",
DROP COLUMN "fp",
DROP COLUMN "income_date",
DROP COLUMN "month",
DROP COLUMN "new_registration_no",
DROP COLUMN "new_registration_province",
DROP COLUMN "registration_no",
DROP COLUMN "registration_province",
DROP COLUMN "release_date",
DROP COLUMN "year",
ADD COLUMN     "approval_amount" DOUBLE PRECISION,
ADD COLUMN     "body_repair" DOUBLE PRECISION,
ADD COLUMN     "book_record_date" TEXT,
ADD COLUMN     "booked_date" TIMESTAMP(3),
ADD COLUMN     "booked_status" BOOLEAN DEFAULT false,
ADD COLUMN     "branch_50_percent_id" INTEGER,
ADD COLUMN     "car_commission" DOUBLE PRECISION,
ADD COLUMN     "car_release_date" TIMESTAMP(3),
ADD COLUMN     "cash_back" DOUBLE PRECISION,
ADD COLUMN     "chassis_no" TEXT,
ADD COLUMN     "down_payment" DOUBLE PRECISION,
ADD COLUMN     "engine_no" TEXT,
ADD COLUMN     "film_radio" DOUBLE PRECISION,
ADD COLUMN     "final_profit" DOUBLE PRECISION,
ADD COLUMN     "financing_id" INTEGER,
ADD COLUMN     "fp_due_date" TIMESTAMP(3),
ADD COLUMN     "fp_name" TEXT,
ADD COLUMN     "fuel_cost" DOUBLE PRECISION,
ADD COLUMN     "gross_profit" DOUBLE PRECISION,
ADD COLUMN     "installment_amount" DOUBLE PRECISION,
ADD COLUMN     "installment_number" INTEGER,
ADD COLUMN     "installment_support" DOUBLE PRECISION,
ADD COLUMN     "interest_fp" DOUBLE PRECISION,
ADD COLUMN     "license_plate_no" TEXT,
ADD COLUMN     "license_plate_province" TEXT,
ADD COLUMN     "mileage" DOUBLE PRECISION,
ADD COLUMN     "net_cost" DOUBLE PRECISION,
ADD COLUMN     "new_license_plate_no" TEXT,
ADD COLUMN     "new_license_plate_province" TEXT,
ADD COLUMN     "new_tires" DOUBLE PRECISION,
ADD COLUMN     "operation_cost" DOUBLE PRECISION,
ADD COLUMN     "other_expenses" DOUBLE PRECISION,
ADD COLUMN     "other_promotions" TEXT,
ADD COLUMN     "paid_difference" DOUBLE PRECISION,
ADD COLUMN     "payment_date" TIMESTAMP(3),
ADD COLUMN     "payment_order" INTEGER,
ADD COLUMN     "payment_status" BOOLEAN DEFAULT false,
ADD COLUMN     "promotion_detail" TEXT,
ADD COLUMN     "purchase_from_id" INTEGER,
ADD COLUMN     "purchase_price" DOUBLE PRECISION,
ADD COLUMN     "referral_fee" DOUBLE PRECISION,
ADD COLUMN     "registration_date" TIMESTAMP(3),
ADD COLUMN     "registration_date_day" INTEGER,
ADD COLUMN     "registration_date_month" INTEGER,
ADD COLUMN     "registration_date_year" INTEGER,
ADD COLUMN     "remaining_loan" DOUBLE PRECISION,
ADD COLUMN     "sale_branch_id" INTEGER,
ADD COLUMN     "sale_price" DOUBLE PRECISION,
ADD COLUMN     "sales_commission" DOUBLE PRECISION,
ADD COLUMN     "seat_upholstery" DOUBLE PRECISION,
ADD COLUMN     "service_cost" DOUBLE PRECISION,
ADD COLUMN     "tax_transfer" DOUBLE PRECISION,
ADD COLUMN     "total_expenses" DOUBLE PRECISION,
ADD COLUMN     "total_income" DOUBLE PRECISION,
ADD COLUMN     "total_promotion_expenses" DOUBLE PRECISION,
ADD COLUMN     "total_purchase_price" DOUBLE PRECISION,
ADD COLUMN     "total_revenue" DOUBLE PRECISION,
ADD COLUMN     "trailer_cost" DOUBLE PRECISION,
ADD COLUMN     "transfer_finance" DOUBLE PRECISION,
ALTER COLUMN "brand_id" DROP NOT NULL,
ALTER COLUMN "model_id" DROP NOT NULL,
ALTER COLUMN "submodel_id" DROP NOT NULL,
ALTER COLUMN "color_id" DROP NOT NULL;

-- DropTable
DROP TABLE "carFinancialDetails";

-- CreateTable
CREATE TABLE "withholdingTaxInvoice" (
    "withholding_invoice_id" SERIAL NOT NULL,
    "car_id" INTEGER NOT NULL,
    "invoice_date" TIMESTAMP(3) NOT NULL,
    "invoice_number" TEXT NOT NULL,
    "vat_3_percent" DOUBLE PRECISION,

    CONSTRAINT "withholdingTaxInvoice_pkey" PRIMARY KEY ("withholding_invoice_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "withholdingTaxInvoice_invoice_number_key" ON "withholdingTaxInvoice"("invoice_number");

-- AddForeignKey
ALTER TABLE "car" ADD CONSTRAINT "car_purchase_from_id_fkey" FOREIGN KEY ("purchase_from_id") REFERENCES "supplier"("supplier_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car" ADD CONSTRAINT "car_financing_id_fkey" FOREIGN KEY ("financing_id") REFERENCES "customer"("customer_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car" ADD CONSTRAINT "car_color_id_fkey" FOREIGN KEY ("color_id") REFERENCES "color"("color_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car" ADD CONSTRAINT "car_sale_branch_id_fkey" FOREIGN KEY ("sale_branch_id") REFERENCES "branch"("branch_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car" ADD CONSTRAINT "car_branch_50_percent_id_fkey" FOREIGN KEY ("branch_50_percent_id") REFERENCES "branch"("branch_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car" ADD CONSTRAINT "car_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "car_brand"("brand_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car" ADD CONSTRAINT "car_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "car_model"("model_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car" ADD CONSTRAINT "car_submodel_id_fkey" FOREIGN KEY ("submodel_id") REFERENCES "car_submodel"("submodel_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "withholdingTaxInvoice" ADD CONSTRAINT "withholdingTaxInvoice_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "car"("car_id") ON DELETE RESTRICT ON UPDATE CASCADE;
