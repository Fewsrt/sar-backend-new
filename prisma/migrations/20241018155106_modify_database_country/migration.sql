-- CreateEnum
CREATE TYPE "Role" AS ENUM ('BUSINESS_OWNER', 'ADMIN', 'SALES', 'PURCHASING', 'ACCOUNTING', 'MAINTENANCE', 'HR', 'USER');

-- CreateEnum
CREATE TYPE "EmployeeStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "EmpCardStatus" AS ENUM ('YES', 'NO');

-- CreateEnum
CREATE TYPE "FollowUpStatus" AS ENUM ('Interested', 'Reserved', 'Closed_Successful', 'Closed_Unsuccessful');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('SALE', 'PURCHASE', 'OTHER');

-- CreateTable
CREATE TABLE "FollowUp" (
    "id" SERIAL NOT NULL,
    "followUpId" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "employee_id" TEXT NOT NULL,
    "followUpDate" TIMESTAMP(3) NOT NULL,
    "status" "FollowUpStatus" NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FollowUp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Geography" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Geography_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Province" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name_th" TEXT NOT NULL,
    "name_en" TEXT NOT NULL,
    "geography_id" INTEGER NOT NULL,

    CONSTRAINT "Province_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "District" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name_th" TEXT NOT NULL,
    "name_en" TEXT NOT NULL,
    "province_id" INTEGER NOT NULL,

    CONSTRAINT "District_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subdistrict" (
    "id" SERIAL NOT NULL,
    "zip_code" INTEGER NOT NULL,
    "name_th" TEXT NOT NULL,
    "name_en" TEXT NOT NULL,
    "districts_id" INTEGER NOT NULL,

    CONSTRAINT "Subdistrict_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarBrand" (
    "brand_id" SERIAL NOT NULL,
    "brand_name" TEXT NOT NULL,

    CONSTRAINT "CarBrand_pkey" PRIMARY KEY ("brand_id")
);

-- CreateTable
CREATE TABLE "CarModel" (
    "model_id" SERIAL NOT NULL,
    "model_name" TEXT NOT NULL,
    "brand_id" INTEGER NOT NULL,

    CONSTRAINT "CarModel_pkey" PRIMARY KEY ("model_id")
);

-- CreateTable
CREATE TABLE "CarSubModel" (
    "submodel_id" SERIAL NOT NULL,
    "submodel_name" TEXT NOT NULL,
    "model_id" INTEGER NOT NULL,

    CONSTRAINT "CarSubModel_pkey" PRIMARY KEY ("submodel_id")
);

-- CreateTable
CREATE TABLE "Car" (
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

    CONSTRAINT "Car_pkey" PRIMARY KEY ("car_id")
);

-- CreateTable
CREATE TABLE "CarFinancialDetails" (
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

    CONSTRAINT "CarFinancialDetails_pkey" PRIMARY KEY ("car_id")
);

-- CreateTable
CREATE TABLE "Customer" (
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

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "reservation_id" SERIAL NOT NULL,
    "customer_id" TEXT NOT NULL,
    "car_id" INTEGER NOT NULL,
    "reservation_date" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "note" TEXT,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("reservation_id")
);

-- CreateTable
CREATE TABLE "Sale" (
    "sale_id" SERIAL NOT NULL,
    "car_id" INTEGER NOT NULL,
    "customer_id" TEXT NOT NULL,
    "sale_date" TIMESTAMP(3) NOT NULL,
    "sale_price" DOUBLE PRECISION NOT NULL,
    "salesperson_id" TEXT NOT NULL,
    "branchBranch_id" INTEGER,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("sale_id")
);

-- CreateTable
CREATE TABLE "Employee" (
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
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "branch_id" INTEGER NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("employee_id")
);

-- CreateTable
CREATE TABLE "BankEmployee" (
    "bank_employee_id" SERIAL NOT NULL,
    "bank_name" TEXT NOT NULL,
    "employee_name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "note" TEXT,

    CONSTRAINT "BankEmployee_pkey" PRIMARY KEY ("bank_employee_id")
);

-- CreateTable
CREATE TABLE "Branch" (
    "branch_id" SERIAL NOT NULL,
    "branch_name" TEXT NOT NULL,
    "address" TEXT,
    "subdistrict_id" INTEGER NOT NULL,
    "district_id" INTEGER NOT NULL,
    "province_id" INTEGER NOT NULL,
    "postal_code" TEXT,
    "phone" TEXT NOT NULL,

    CONSTRAINT "Branch_pkey" PRIMARY KEY ("branch_id")
);

-- CreateTable
CREATE TABLE "CarInspection" (
    "inspection_id" SERIAL NOT NULL,
    "car_id" INTEGER NOT NULL,
    "inspection_date" TIMESTAMP(3) NOT NULL,
    "inspector_id" TEXT NOT NULL,
    "inspection_notes" TEXT,
    "before_repair_image_link" TEXT,

    CONSTRAINT "CarInspection_pkey" PRIMARY KEY ("inspection_id")
);

-- CreateTable
CREATE TABLE "Maintenance" (
    "maintenance_id" SERIAL NOT NULL,
    "car_id" INTEGER NOT NULL,
    "maintenance_date" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "cost" DOUBLE PRECISION,
    "employee_id" TEXT NOT NULL,
    "before_repair_image_link" TEXT,
    "after_repair_image_link" TEXT,
    "maintenance_status" TEXT NOT NULL,

    CONSTRAINT "Maintenance_pkey" PRIMARY KEY ("maintenance_id")
);

-- CreateTable
CREATE TABLE "Accounting" (
    "accounting_id" SERIAL NOT NULL,
    "transaction_type" "TransactionType" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "transaction_date" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "car_id" INTEGER,
    "branch_id" INTEGER NOT NULL,

    CONSTRAINT "Accounting_pkey" PRIMARY KEY ("accounting_id")
);

-- CreateTable
CREATE TABLE "Supplier" (
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

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("supplier_id")
);

-- CreateTable
CREATE TABLE "CustomerPurchaseHistory" (
    "history_id" SERIAL NOT NULL,
    "customer_id" TEXT NOT NULL,
    "car_id" INTEGER NOT NULL,
    "purchase_date" TIMESTAMP(3),
    "purchase_price" DOUBLE PRECISION,

    CONSTRAINT "CustomerPurchaseHistory_pkey" PRIMARY KEY ("history_id")
);

-- CreateTable
CREATE TABLE "BankTransferTracking" (
    "tracking_id" SERIAL NOT NULL,
    "car_id" INTEGER NOT NULL,
    "follow_up_number" INTEGER NOT NULL,
    "follow_up_date" TIMESTAMP(3) NOT NULL,
    "bank_employee_id" INTEGER NOT NULL,
    "follow_up_note" TEXT,

    CONSTRAINT "BankTransferTracking_pkey" PRIMARY KEY ("tracking_id")
);

-- CreateTable
CREATE TABLE "Attendance" (
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

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("attendance_id")
);

-- CreateTable
CREATE TABLE "LiveSchedule" (
    "live_id" SERIAL NOT NULL,
    "live_category" TEXT NOT NULL,
    "branch_id" INTEGER NOT NULL,
    "start_datetime" TIMESTAMP(3) NOT NULL,
    "end_datetime" TIMESTAMP(3) NOT NULL,
    "description" TEXT,

    CONSTRAINT "LiveSchedule_pkey" PRIMARY KEY ("live_id")
);

-- CreateTable
CREATE TABLE "TaxInvoice" (
    "invoice_id" SERIAL NOT NULL,
    "car_id" INTEGER NOT NULL,
    "invoice_date" TIMESTAMP(3) NOT NULL,
    "customer_id" TEXT NOT NULL,
    "sale_price_before_vat" DOUBLE PRECISION,
    "vat_7_percent" DOUBLE PRECISION,
    "sale_price_incl_vat" DOUBLE PRECISION,
    "invoice_type" TEXT NOT NULL,

    CONSTRAINT "TaxInvoice_pkey" PRIMARY KEY ("invoice_id")
);

-- CreateTable
CREATE TABLE "PurchaseTaxInvoice" (
    "purchase_invoice_id" SERIAL NOT NULL,
    "car_id" INTEGER NOT NULL,
    "invoice_date" TIMESTAMP(3) NOT NULL,
    "invoice_number" TEXT NOT NULL,
    "supplier_id" INTEGER NOT NULL,
    "product_value_before_vat" DOUBLE PRECISION,
    "vat_7_percent" DOUBLE PRECISION,
    "product_value_incl_operations" DOUBLE PRECISION,
    "no_vat" BOOLEAN NOT NULL,

    CONSTRAINT "PurchaseTaxInvoice_pkey" PRIMARY KEY ("purchase_invoice_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FollowUp_followUpId_key" ON "FollowUp"("followUpId");

-- CreateIndex
CREATE INDEX "FollowUp_customer_id_idx" ON "FollowUp"("customer_id");

-- CreateIndex
CREATE INDEX "FollowUp_employee_id_idx" ON "FollowUp"("employee_id");

-- CreateIndex
CREATE UNIQUE INDEX "Province_code_key" ON "Province"("code");

-- CreateIndex
CREATE UNIQUE INDEX "CarBrand_brand_name_key" ON "CarBrand"("brand_name");

-- CreateIndex
CREATE UNIQUE INDEX "Car_car_code_key" ON "Car"("car_code");

-- CreateIndex
CREATE UNIQUE INDEX "Car_registration_no_key" ON "Car"("registration_no");

-- CreateIndex
CREATE INDEX "Car_customer_id_idx" ON "Car"("customer_id");

-- CreateIndex
CREATE INDEX "Car_car_id_idx" ON "Car"("car_id");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_phone_key" ON "Customer"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_tax_id_key" ON "Customer"("tax_id");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_employee_code_key" ON "Employee"("employee_code");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_phone_key" ON "Employee"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "BankEmployee_phone_key" ON "BankEmployee"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "BankEmployee_email_key" ON "BankEmployee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Branch_phone_key" ON "Branch"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_supplier_code_key" ON "Supplier"("supplier_code");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_phone_key" ON "Supplier"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_email_key" ON "Supplier"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_tax_id_key" ON "Supplier"("tax_id");

-- CreateIndex
CREATE UNIQUE INDEX "Attendance_line_uuid_key" ON "Attendance"("line_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "PurchaseTaxInvoice_invoice_number_key" ON "PurchaseTaxInvoice"("invoice_number");

-- AddForeignKey
ALTER TABLE "FollowUp" ADD CONSTRAINT "FollowUp_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FollowUp" ADD CONSTRAINT "FollowUp_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Province" ADD CONSTRAINT "Province_geography_id_fkey" FOREIGN KEY ("geography_id") REFERENCES "Geography"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "District" ADD CONSTRAINT "District_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "Province"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subdistrict" ADD CONSTRAINT "Subdistrict_districts_id_fkey" FOREIGN KEY ("districts_id") REFERENCES "District"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarModel" ADD CONSTRAINT "CarModel_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "CarBrand"("brand_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarSubModel" ADD CONSTRAINT "CarSubModel_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "CarModel"("model_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "CarBrand"("brand_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "CarModel"("model_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_submodel_id_fkey" FOREIGN KEY ("submodel_id") REFERENCES "CarSubModel"("submodel_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("customer_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_salesperson_id_fkey" FOREIGN KEY ("salesperson_id") REFERENCES "Employee"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarFinancialDetails" ADD CONSTRAINT "CarFinancialDetails_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "Car"("car_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_subdistrict_id_fkey" FOREIGN KEY ("subdistrict_id") REFERENCES "Subdistrict"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "District"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "Province"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "Car"("car_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "Car"("car_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_salesperson_id_fkey" FOREIGN KEY ("salesperson_id") REFERENCES "Employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_branchBranch_id_fkey" FOREIGN KEY ("branchBranch_id") REFERENCES "Branch"("branch_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "Branch"("branch_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Branch" ADD CONSTRAINT "Branch_subdistrict_id_fkey" FOREIGN KEY ("subdistrict_id") REFERENCES "Subdistrict"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Branch" ADD CONSTRAINT "Branch_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "District"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Branch" ADD CONSTRAINT "Branch_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "Province"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarInspection" ADD CONSTRAINT "CarInspection_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "Car"("car_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarInspection" ADD CONSTRAINT "CarInspection_inspector_id_fkey" FOREIGN KEY ("inspector_id") REFERENCES "Employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Maintenance" ADD CONSTRAINT "Maintenance_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "Car"("car_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Maintenance" ADD CONSTRAINT "Maintenance_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accounting" ADD CONSTRAINT "Accounting_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "Car"("car_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accounting" ADD CONSTRAINT "Accounting_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "Branch"("branch_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Supplier" ADD CONSTRAINT "Supplier_subdistrict_id_fkey" FOREIGN KEY ("subdistrict_id") REFERENCES "Subdistrict"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Supplier" ADD CONSTRAINT "Supplier_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "District"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Supplier" ADD CONSTRAINT "Supplier_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "Province"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Supplier" ADD CONSTRAINT "Supplier_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "Branch"("branch_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerPurchaseHistory" ADD CONSTRAINT "CustomerPurchaseHistory_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerPurchaseHistory" ADD CONSTRAINT "CustomerPurchaseHistory_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "Car"("car_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankTransferTracking" ADD CONSTRAINT "BankTransferTracking_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "Car"("car_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankTransferTracking" ADD CONSTRAINT "BankTransferTracking_bank_employee_id_fkey" FOREIGN KEY ("bank_employee_id") REFERENCES "BankEmployee"("bank_employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LiveSchedule" ADD CONSTRAINT "LiveSchedule_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "Branch"("branch_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaxInvoice" ADD CONSTRAINT "TaxInvoice_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "Car"("car_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaxInvoice" ADD CONSTRAINT "TaxInvoice_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseTaxInvoice" ADD CONSTRAINT "PurchaseTaxInvoice_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "Car"("car_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseTaxInvoice" ADD CONSTRAINT "PurchaseTaxInvoice_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "Supplier"("supplier_id") ON DELETE RESTRICT ON UPDATE CASCADE;
