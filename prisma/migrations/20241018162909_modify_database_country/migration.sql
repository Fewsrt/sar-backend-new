/*
  Warnings:

  - You are about to drop the `Accounting` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Attendance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BankEmployee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BankTransferTracking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Branch` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Car` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CarBrand` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CarFinancialDetails` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CarInspection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CarModel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CarSubModel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CustomerPurchaseHistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `District` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Employee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FollowUp` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Geography` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LiveSchedule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Maintenance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Province` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PurchaseTaxInvoice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reservation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sale` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Subdistrict` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Supplier` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TaxInvoice` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "role" AS ENUM ('business_owner', 'admin', 'sales', 'purchasing', 'accounting', 'maintenance', 'hr', 'user');

-- CreateEnum
CREATE TYPE "employeeStatus" AS ENUM ('active', 'inactive');

-- CreateEnum
CREATE TYPE "empCardStatus" AS ENUM ('yes', 'no');

-- CreateEnum
CREATE TYPE "followUpStatus" AS ENUM ('interested', 'reserved', 'closed_successful', 'closed_unsuccessful');

-- CreateEnum
CREATE TYPE "transactionType" AS ENUM ('sale', 'purchase', 'other');

-- DropForeignKey
ALTER TABLE "Accounting" DROP CONSTRAINT "Accounting_branch_id_fkey";

-- DropForeignKey
ALTER TABLE "Accounting" DROP CONSTRAINT "Accounting_car_id_fkey";

-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "BankTransferTracking" DROP CONSTRAINT "BankTransferTracking_bank_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "BankTransferTracking" DROP CONSTRAINT "BankTransferTracking_car_id_fkey";

-- DropForeignKey
ALTER TABLE "Branch" DROP CONSTRAINT "Branch_district_id_fkey";

-- DropForeignKey
ALTER TABLE "Branch" DROP CONSTRAINT "Branch_province_id_fkey";

-- DropForeignKey
ALTER TABLE "Branch" DROP CONSTRAINT "Branch_subdistrict_id_fkey";

-- DropForeignKey
ALTER TABLE "Car" DROP CONSTRAINT "Car_brand_id_fkey";

-- DropForeignKey
ALTER TABLE "Car" DROP CONSTRAINT "Car_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "Car" DROP CONSTRAINT "Car_model_id_fkey";

-- DropForeignKey
ALTER TABLE "Car" DROP CONSTRAINT "Car_salesperson_id_fkey";

-- DropForeignKey
ALTER TABLE "Car" DROP CONSTRAINT "Car_submodel_id_fkey";

-- DropForeignKey
ALTER TABLE "CarFinancialDetails" DROP CONSTRAINT "CarFinancialDetails_car_id_fkey";

-- DropForeignKey
ALTER TABLE "CarInspection" DROP CONSTRAINT "CarInspection_car_id_fkey";

-- DropForeignKey
ALTER TABLE "CarInspection" DROP CONSTRAINT "CarInspection_inspector_id_fkey";

-- DropForeignKey
ALTER TABLE "CarModel" DROP CONSTRAINT "CarModel_brand_id_fkey";

-- DropForeignKey
ALTER TABLE "CarSubModel" DROP CONSTRAINT "CarSubModel_model_id_fkey";

-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_district_id_fkey";

-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_province_id_fkey";

-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_subdistrict_id_fkey";

-- DropForeignKey
ALTER TABLE "CustomerPurchaseHistory" DROP CONSTRAINT "CustomerPurchaseHistory_car_id_fkey";

-- DropForeignKey
ALTER TABLE "CustomerPurchaseHistory" DROP CONSTRAINT "CustomerPurchaseHistory_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "District" DROP CONSTRAINT "District_province_id_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_branch_id_fkey";

-- DropForeignKey
ALTER TABLE "FollowUp" DROP CONSTRAINT "FollowUp_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "FollowUp" DROP CONSTRAINT "FollowUp_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "LiveSchedule" DROP CONSTRAINT "LiveSchedule_branch_id_fkey";

-- DropForeignKey
ALTER TABLE "Maintenance" DROP CONSTRAINT "Maintenance_car_id_fkey";

-- DropForeignKey
ALTER TABLE "Maintenance" DROP CONSTRAINT "Maintenance_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "Province" DROP CONSTRAINT "Province_geography_id_fkey";

-- DropForeignKey
ALTER TABLE "PurchaseTaxInvoice" DROP CONSTRAINT "PurchaseTaxInvoice_car_id_fkey";

-- DropForeignKey
ALTER TABLE "PurchaseTaxInvoice" DROP CONSTRAINT "PurchaseTaxInvoice_supplier_id_fkey";

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_car_id_fkey";

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_branchBranch_id_fkey";

-- DropForeignKey
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_car_id_fkey";

-- DropForeignKey
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_salesperson_id_fkey";

-- DropForeignKey
ALTER TABLE "Subdistrict" DROP CONSTRAINT "Subdistrict_district_id_fkey";

-- DropForeignKey
ALTER TABLE "Supplier" DROP CONSTRAINT "Supplier_branch_id_fkey";

-- DropForeignKey
ALTER TABLE "Supplier" DROP CONSTRAINT "Supplier_district_id_fkey";

-- DropForeignKey
ALTER TABLE "Supplier" DROP CONSTRAINT "Supplier_province_id_fkey";

-- DropForeignKey
ALTER TABLE "Supplier" DROP CONSTRAINT "Supplier_subdistrict_id_fkey";

-- DropForeignKey
ALTER TABLE "TaxInvoice" DROP CONSTRAINT "TaxInvoice_car_id_fkey";

-- DropForeignKey
ALTER TABLE "TaxInvoice" DROP CONSTRAINT "TaxInvoice_customer_id_fkey";

-- DropTable
DROP TABLE "Accounting";

-- DropTable
DROP TABLE "Attendance";

-- DropTable
DROP TABLE "BankEmployee";

-- DropTable
DROP TABLE "BankTransferTracking";

-- DropTable
DROP TABLE "Branch";

-- DropTable
DROP TABLE "Car";

-- DropTable
DROP TABLE "CarBrand";

-- DropTable
DROP TABLE "CarFinancialDetails";

-- DropTable
DROP TABLE "CarInspection";

-- DropTable
DROP TABLE "CarModel";

-- DropTable
DROP TABLE "CarSubModel";

-- DropTable
DROP TABLE "Customer";

-- DropTable
DROP TABLE "CustomerPurchaseHistory";

-- DropTable
DROP TABLE "District";

-- DropTable
DROP TABLE "Employee";

-- DropTable
DROP TABLE "FollowUp";

-- DropTable
DROP TABLE "Geography";

-- DropTable
DROP TABLE "LiveSchedule";

-- DropTable
DROP TABLE "Maintenance";

-- DropTable
DROP TABLE "Province";

-- DropTable
DROP TABLE "PurchaseTaxInvoice";

-- DropTable
DROP TABLE "Reservation";

-- DropTable
DROP TABLE "Sale";

-- DropTable
DROP TABLE "Subdistrict";

-- DropTable
DROP TABLE "Supplier";

-- DropTable
DROP TABLE "TaxInvoice";

-- DropEnum
DROP TYPE "EmpCardStatus";

-- DropEnum
DROP TYPE "EmployeeStatus";

-- DropEnum
DROP TYPE "FollowUpStatus";

-- DropEnum
DROP TYPE "Role";

-- DropEnum
DROP TYPE "TransactionType";

-- CreateTable
CREATE TABLE "followUp" (
    "id" SERIAL NOT NULL,
    "followUpId" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "employee_id" TEXT NOT NULL,
    "followUpDate" TIMESTAMP(3) NOT NULL,
    "status" "followUpStatus" NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "followUp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "geography" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,

    CONSTRAINT "geography_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "province" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(2) NOT NULL,
    "name_th" VARCHAR(150) NOT NULL,
    "name_en" VARCHAR(150) NOT NULL,
    "geography_id" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "province_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "district" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(4) NOT NULL,
    "name_th" VARCHAR(150) NOT NULL,
    "name_en" VARCHAR(150) NOT NULL,
    "province_id" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "district_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subdistrict" (
    "id" SERIAL NOT NULL,
    "zip_code" INTEGER NOT NULL,
    "name_th" VARCHAR(150) NOT NULL,
    "name_en" VARCHAR(150) NOT NULL,
    "district_id" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "subdistrict_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carBrand" (
    "brand_id" SERIAL NOT NULL,
    "brand_name" TEXT NOT NULL,

    CONSTRAINT "carBrand_pkey" PRIMARY KEY ("brand_id")
);

-- CreateTable
CREATE TABLE "carModel" (
    "model_id" SERIAL NOT NULL,
    "model_name" TEXT NOT NULL,
    "brand_id" INTEGER NOT NULL,

    CONSTRAINT "carModel_pkey" PRIMARY KEY ("model_id")
);

-- CreateTable
CREATE TABLE "carSubModel" (
    "submodel_id" SERIAL NOT NULL,
    "submodel_name" TEXT NOT NULL,
    "model_id" INTEGER NOT NULL,

    CONSTRAINT "carSubModel_pkey" PRIMARY KEY ("submodel_id")
);

-- CreateTable
CREATE TABLE "car" (
    "car_id" SERIAL NOT NULL,
    "car_code" TEXT NOT NULL,
    "purchase_date" TIMESTAMP(3),
    "status" TEXT NOT NULL,
    "approval_status" BOOLEAN DEFAULT false,
    "approval_order" INTEGER,
    "approval_date" TIMESTAMP(3),
    "release_date" TIMESTAMP(3),
    "book_close_date" TIMESTAMP(3),
    "tax_invoice_sale_date" TIMESTAMP(3),
    "book_sent_to_bank_date" TIMESTAMP(3),
    "income_date" TIMESTAMP(3),
    "transfer_status" TEXT,
    "fp" TEXT,
    "financing" BOOLEAN DEFAULT false,
    "brand_id" INTEGER NOT NULL,
    "model_id" INTEGER NOT NULL,
    "submodel_id" INTEGER NOT NULL,
    "registration_no" TEXT NOT NULL,
    "registration_province" TEXT,
    "new_registration_no" TEXT,
    "new_registration_province" TEXT,
    "customer_id" TEXT,
    "salesperson_id" TEXT,
    "expected_income" DOUBLE PRECISION,
    "expected_profit" DOUBLE PRECISION,
    "car_tracking" TEXT,
    "tracking_note" TEXT,
    "note" TEXT,
    "car_image_link" TEXT,

    CONSTRAINT "car_pkey" PRIMARY KEY ("car_id")
);

-- CreateTable
CREATE TABLE "carFinancialDetails" (
    "car_id" INTEGER NOT NULL,
    "sale_price" DOUBLE PRECISION,
    "net_cost" DOUBLE PRECISION,
    "gross_profit" DOUBLE PRECISION,
    "purchase_price" DOUBLE PRECISION,
    "operation_cost" DOUBLE PRECISION,
    "total_purchase_price" DOUBLE PRECISION,
    "remaining_loan" DOUBLE PRECISION,
    "paid_difference" DOUBLE PRECISION,
    "total_income" DOUBLE PRECISION,
    "transfer_finance" DOUBLE PRECISION,
    "car_commission" DOUBLE PRECISION,
    "down_payment" DOUBLE PRECISION,
    "total_revenue" DOUBLE PRECISION,
    "interest_fp" DOUBLE PRECISION,
    "body_repair" DOUBLE PRECISION,
    "service_cost" DOUBLE PRECISION,
    "film_radio" DOUBLE PRECISION,
    "seat_upholstery" DOUBLE PRECISION,
    "tax_transfer" DOUBLE PRECISION,
    "sales_commission" DOUBLE PRECISION,
    "fuel_cost" DOUBLE PRECISION,
    "referral_fee" DOUBLE PRECISION,
    "trailer_cost" DOUBLE PRECISION,
    "other_expenses" DOUBLE PRECISION,
    "total_expenses" DOUBLE PRECISION,
    "new_tires" DOUBLE PRECISION,
    "installment_support" DOUBLE PRECISION,
    "cash_back" DOUBLE PRECISION,
    "other_promotions" TEXT,
    "total_promotion_expenses" DOUBLE PRECISION,
    "final_profit" DOUBLE PRECISION,

    CONSTRAINT "carFinancialDetails_pkey" PRIMARY KEY ("car_id")
);

-- CreateTable
CREATE TABLE "customer" (
    "customer_id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT,
    "subdistrict_id" INTEGER NOT NULL,
    "district_id" INTEGER NOT NULL,
    "province_id" INTEGER NOT NULL,
    "postal_code" TEXT,
    "tax_id" TEXT NOT NULL,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "reservation" (
    "reservation_id" SERIAL NOT NULL,
    "customer_id" TEXT NOT NULL,
    "car_id" INTEGER NOT NULL,
    "reservation_date" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "note" TEXT,

    CONSTRAINT "reservation_pkey" PRIMARY KEY ("reservation_id")
);

-- CreateTable
CREATE TABLE "sale" (
    "sale_id" SERIAL NOT NULL,
    "car_id" INTEGER NOT NULL,
    "customer_id" TEXT NOT NULL,
    "sale_date" TIMESTAMP(3) NOT NULL,
    "sale_price" DOUBLE PRECISION NOT NULL,
    "salesperson_id" TEXT NOT NULL,
    "branchBranch_id" INTEGER,

    CONSTRAINT "sale_pkey" PRIMARY KEY ("sale_id")
);

-- CreateTable
CREATE TABLE "employee" (
    "employee_id" TEXT NOT NULL,
    "employee_code" TEXT NOT NULL,
    "title" TEXT,
    "full_name" TEXT NOT NULL,
    "nickname" TEXT,
    "position" TEXT NOT NULL,
    "branch_province" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profile_picture" TEXT,
    "employment_status" TEXT NOT NULL,
    "employee_card" TEXT,
    "line_uuid" TEXT,
    "isFirstLogin" BOOLEAN NOT NULL DEFAULT true,
    "role" "role" NOT NULL DEFAULT 'user',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "branch_id" INTEGER NOT NULL,

    CONSTRAINT "employee_pkey" PRIMARY KEY ("employee_id")
);

-- CreateTable
CREATE TABLE "bankEmployee" (
    "bank_employee_id" SERIAL NOT NULL,
    "bank_name" TEXT NOT NULL,
    "employee_name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "note" TEXT,

    CONSTRAINT "bankEmployee_pkey" PRIMARY KEY ("bank_employee_id")
);

-- CreateTable
CREATE TABLE "branch" (
    "branch_id" SERIAL NOT NULL,
    "branch_name" TEXT NOT NULL,
    "address" TEXT,
    "subdistrict_id" INTEGER NOT NULL,
    "district_id" INTEGER NOT NULL,
    "province_id" INTEGER NOT NULL,
    "postal_code" TEXT,
    "phone" TEXT NOT NULL,

    CONSTRAINT "branch_pkey" PRIMARY KEY ("branch_id")
);

-- CreateTable
CREATE TABLE "carInspection" (
    "inspection_id" SERIAL NOT NULL,
    "car_id" INTEGER NOT NULL,
    "inspection_date" TIMESTAMP(3) NOT NULL,
    "inspector_id" TEXT NOT NULL,
    "inspection_notes" TEXT,
    "before_repair_image_link" TEXT,

    CONSTRAINT "carInspection_pkey" PRIMARY KEY ("inspection_id")
);

-- CreateTable
CREATE TABLE "maintenance" (
    "maintenance_id" SERIAL NOT NULL,
    "car_id" INTEGER NOT NULL,
    "maintenance_date" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "cost" DOUBLE PRECISION,
    "employee_id" TEXT NOT NULL,
    "before_repair_image_link" TEXT,
    "after_repair_image_link" TEXT,
    "maintenance_status" TEXT NOT NULL,

    CONSTRAINT "maintenance_pkey" PRIMARY KEY ("maintenance_id")
);

-- CreateTable
CREATE TABLE "accounting" (
    "accounting_id" SERIAL NOT NULL,
    "transaction_type" "transactionType" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "transaction_date" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "car_id" INTEGER,
    "branch_id" INTEGER NOT NULL,

    CONSTRAINT "accounting_pkey" PRIMARY KEY ("accounting_id")
);

-- CreateTable
CREATE TABLE "supplier" (
    "supplier_id" SERIAL NOT NULL,
    "supplier_code" TEXT NOT NULL,
    "supplier_name" TEXT NOT NULL,
    "contact_person" TEXT,
    "phone" VARCHAR(10) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "address" TEXT,
    "subdistrict_id" INTEGER NOT NULL,
    "district_id" INTEGER NOT NULL,
    "province_id" INTEGER NOT NULL,
    "postal_code" TEXT,
    "branch_id" INTEGER NOT NULL,
    "tax_id" VARCHAR(13) NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "supplier_pkey" PRIMARY KEY ("supplier_id")
);

-- CreateTable
CREATE TABLE "customerPurchaseHistory" (
    "history_id" SERIAL NOT NULL,
    "customer_id" TEXT NOT NULL,
    "car_id" INTEGER NOT NULL,
    "purchase_date" TIMESTAMP(3),
    "purchase_price" DOUBLE PRECISION,

    CONSTRAINT "customerPurchaseHistory_pkey" PRIMARY KEY ("history_id")
);

-- CreateTable
CREATE TABLE "bankTransferTracking" (
    "tracking_id" SERIAL NOT NULL,
    "car_id" INTEGER NOT NULL,
    "follow_up_number" INTEGER NOT NULL,
    "follow_up_date" TIMESTAMP(3) NOT NULL,
    "bank_employee_id" INTEGER NOT NULL,
    "follow_up_note" TEXT,

    CONSTRAINT "bankTransferTracking_pkey" PRIMARY KEY ("tracking_id")
);

-- CreateTable
CREATE TABLE "attendance" (
    "attendance_id" SERIAL NOT NULL,
    "employee_id" TEXT NOT NULL,
    "check_in_time" TIMESTAMP(3),
    "check_out_time" TIMESTAMP(3),
    "check_in_latitude" DOUBLE PRECISION,
    "check_in_longitude" DOUBLE PRECISION,
    "check_out_latitude" DOUBLE PRECISION,
    "check_out_longitude" DOUBLE PRECISION,
    "status" TEXT NOT NULL,
    "line_uuid" TEXT NOT NULL,
    "note" TEXT,

    CONSTRAINT "attendance_pkey" PRIMARY KEY ("attendance_id")
);

-- CreateTable
CREATE TABLE "liveSchedule" (
    "live_id" SERIAL NOT NULL,
    "live_category" TEXT NOT NULL,
    "branch_id" INTEGER NOT NULL,
    "start_datetime" TIMESTAMP(3) NOT NULL,
    "end_datetime" TIMESTAMP(3) NOT NULL,
    "description" TEXT,

    CONSTRAINT "liveSchedule_pkey" PRIMARY KEY ("live_id")
);

-- CreateTable
CREATE TABLE "taxInvoice" (
    "invoice_id" SERIAL NOT NULL,
    "car_id" INTEGER NOT NULL,
    "invoice_date" TIMESTAMP(3) NOT NULL,
    "customer_id" TEXT NOT NULL,
    "sale_price_before_vat" DOUBLE PRECISION,
    "vat_7_percent" DOUBLE PRECISION,
    "sale_price_incl_vat" DOUBLE PRECISION,
    "invoice_type" TEXT NOT NULL,

    CONSTRAINT "taxInvoice_pkey" PRIMARY KEY ("invoice_id")
);

-- CreateTable
CREATE TABLE "purchaseTaxInvoice" (
    "purchase_invoice_id" SERIAL NOT NULL,
    "car_id" INTEGER NOT NULL,
    "invoice_date" TIMESTAMP(3) NOT NULL,
    "invoice_number" TEXT NOT NULL,
    "supplier_id" INTEGER NOT NULL,
    "product_value_before_vat" DOUBLE PRECISION,
    "vat_7_percent" DOUBLE PRECISION,
    "product_value_incl_operations" DOUBLE PRECISION,
    "no_vat" BOOLEAN NOT NULL,

    CONSTRAINT "purchaseTaxInvoice_pkey" PRIMARY KEY ("purchase_invoice_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "followUp_followUpId_key" ON "followUp"("followUpId");

-- CreateIndex
CREATE INDEX "followUp_customer_id_idx" ON "followUp"("customer_id");

-- CreateIndex
CREATE INDEX "followUp_employee_id_idx" ON "followUp"("employee_id");

-- CreateIndex
CREATE UNIQUE INDEX "province_code_key" ON "province"("code");

-- CreateIndex
CREATE UNIQUE INDEX "carBrand_brand_name_key" ON "carBrand"("brand_name");

-- CreateIndex
CREATE UNIQUE INDEX "car_car_code_key" ON "car"("car_code");

-- CreateIndex
CREATE UNIQUE INDEX "car_registration_no_key" ON "car"("registration_no");

-- CreateIndex
CREATE INDEX "car_customer_id_idx" ON "car"("customer_id");

-- CreateIndex
CREATE INDEX "car_car_id_idx" ON "car"("car_id");

-- CreateIndex
CREATE UNIQUE INDEX "customer_phone_key" ON "customer"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "customer_email_key" ON "customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "customer_tax_id_key" ON "customer"("tax_id");

-- CreateIndex
CREATE UNIQUE INDEX "employee_employee_code_key" ON "employee"("employee_code");

-- CreateIndex
CREATE UNIQUE INDEX "employee_phone_key" ON "employee"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "employee_email_key" ON "employee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "bankEmployee_phone_key" ON "bankEmployee"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "bankEmployee_email_key" ON "bankEmployee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "branch_phone_key" ON "branch"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "supplier_supplier_code_key" ON "supplier"("supplier_code");

-- CreateIndex
CREATE UNIQUE INDEX "supplier_phone_key" ON "supplier"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "supplier_email_key" ON "supplier"("email");

-- CreateIndex
CREATE UNIQUE INDEX "supplier_tax_id_key" ON "supplier"("tax_id");

-- CreateIndex
CREATE UNIQUE INDEX "attendance_line_uuid_key" ON "attendance"("line_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "purchaseTaxInvoice_invoice_number_key" ON "purchaseTaxInvoice"("invoice_number");

-- AddForeignKey
ALTER TABLE "followUp" ADD CONSTRAINT "followUp_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "followUp" ADD CONSTRAINT "followUp_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "province" ADD CONSTRAINT "province_geography_id_fkey" FOREIGN KEY ("geography_id") REFERENCES "geography"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "district" ADD CONSTRAINT "district_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "province"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subdistrict" ADD CONSTRAINT "subdistrict_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "district"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carModel" ADD CONSTRAINT "carModel_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "carBrand"("brand_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carSubModel" ADD CONSTRAINT "carSubModel_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "carModel"("model_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car" ADD CONSTRAINT "car_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "carBrand"("brand_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car" ADD CONSTRAINT "car_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "carModel"("model_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car" ADD CONSTRAINT "car_submodel_id_fkey" FOREIGN KEY ("submodel_id") REFERENCES "carSubModel"("submodel_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car" ADD CONSTRAINT "car_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("customer_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car" ADD CONSTRAINT "car_salesperson_id_fkey" FOREIGN KEY ("salesperson_id") REFERENCES "employee"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carFinancialDetails" ADD CONSTRAINT "carFinancialDetails_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "car"("car_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer" ADD CONSTRAINT "customer_subdistrict_id_fkey" FOREIGN KEY ("subdistrict_id") REFERENCES "subdistrict"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer" ADD CONSTRAINT "customer_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "district"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer" ADD CONSTRAINT "customer_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "province"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservation" ADD CONSTRAINT "reservation_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservation" ADD CONSTRAINT "reservation_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "car"("car_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale" ADD CONSTRAINT "sale_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "car"("car_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale" ADD CONSTRAINT "sale_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale" ADD CONSTRAINT "sale_salesperson_id_fkey" FOREIGN KEY ("salesperson_id") REFERENCES "employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale" ADD CONSTRAINT "sale_branchBranch_id_fkey" FOREIGN KEY ("branchBranch_id") REFERENCES "branch"("branch_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branch"("branch_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "branch" ADD CONSTRAINT "branch_subdistrict_id_fkey" FOREIGN KEY ("subdistrict_id") REFERENCES "subdistrict"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "branch" ADD CONSTRAINT "branch_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "district"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "branch" ADD CONSTRAINT "branch_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "province"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carInspection" ADD CONSTRAINT "carInspection_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "car"("car_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carInspection" ADD CONSTRAINT "carInspection_inspector_id_fkey" FOREIGN KEY ("inspector_id") REFERENCES "employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance" ADD CONSTRAINT "maintenance_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "car"("car_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance" ADD CONSTRAINT "maintenance_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounting" ADD CONSTRAINT "accounting_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "car"("car_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounting" ADD CONSTRAINT "accounting_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branch"("branch_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier" ADD CONSTRAINT "supplier_subdistrict_id_fkey" FOREIGN KEY ("subdistrict_id") REFERENCES "subdistrict"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier" ADD CONSTRAINT "supplier_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "district"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier" ADD CONSTRAINT "supplier_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "province"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier" ADD CONSTRAINT "supplier_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branch"("branch_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customerPurchaseHistory" ADD CONSTRAINT "customerPurchaseHistory_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customerPurchaseHistory" ADD CONSTRAINT "customerPurchaseHistory_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "car"("car_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bankTransferTracking" ADD CONSTRAINT "bankTransferTracking_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "car"("car_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bankTransferTracking" ADD CONSTRAINT "bankTransferTracking_bank_employee_id_fkey" FOREIGN KEY ("bank_employee_id") REFERENCES "bankEmployee"("bank_employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "liveSchedule" ADD CONSTRAINT "liveSchedule_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branch"("branch_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "taxInvoice" ADD CONSTRAINT "taxInvoice_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "car"("car_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "taxInvoice" ADD CONSTRAINT "taxInvoice_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchaseTaxInvoice" ADD CONSTRAINT "purchaseTaxInvoice_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "car"("car_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchaseTaxInvoice" ADD CONSTRAINT "purchaseTaxInvoice_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "supplier"("supplier_id") ON DELETE RESTRICT ON UPDATE CASCADE;
