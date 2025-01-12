-- CreateEnum
CREATE TYPE "carStatus" AS ENUM ('car_entry', 'inspection', 'maintenance', 'available', 'reserved', 'approved', 'delivery', 'payment_received', 'sold', 'pending');

-- CreateEnum
CREATE TYPE "transferStatus" AS ENUM ('pending', 'in_progress', 'completed', 'cancelled');

-- CreateEnum
CREATE TYPE "trackingStatus" AS ENUM ('pending', 'following_up', 'completed', 'cancelled');

-- CreateEnum
CREATE TYPE "role" AS ENUM ('business_owner', 'admin', 'sales', 'purchasing', 'accounting', 'maintenance', 'hr', 'user');

-- CreateEnum
CREATE TYPE "employeeStatus" AS ENUM ('active', 'inactive');

-- CreateEnum
CREATE TYPE "empCardStatus" AS ENUM ('yes', 'no');

-- CreateEnum
CREATE TYPE "attendanceStatus" AS ENUM ('checked_in', 'checked_out');

-- CreateEnum
CREATE TYPE "followUpStatus" AS ENUM ('interested', 'reserved', 'closed_successful', 'closed_unsuccessful');

-- CreateEnum
CREATE TYPE "transactionType" AS ENUM ('sale', 'purchase', 'other');

-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('super_admin', 'admin');

-- CreateEnum
CREATE TYPE "LogLevel" AS ENUM ('info', 'warning', 'error');

-- CreateTable
CREATE TABLE "color" (
    "color_id" SERIAL NOT NULL,
    "color_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "color_pkey" PRIMARY KEY ("color_id")
);

-- CreateTable
CREATE TABLE "followUp" (
    "id" SERIAL NOT NULL,
    "followUpId" TEXT NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "employee_id" INTEGER NOT NULL,
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
CREATE TABLE "car_brand" (
    "brand_id" SERIAL NOT NULL,
    "brand_name" TEXT NOT NULL,

    CONSTRAINT "car_brand_pkey" PRIMARY KEY ("brand_id")
);

-- CreateTable
CREATE TABLE "car_model" (
    "model_id" SERIAL NOT NULL,
    "model_name" TEXT NOT NULL,
    "brand_id" INTEGER NOT NULL,

    CONSTRAINT "car_model_pkey" PRIMARY KEY ("model_id")
);

-- CreateTable
CREATE TABLE "car_submodel" (
    "submodel_id" SERIAL NOT NULL,
    "submodel_name" TEXT NOT NULL,
    "model_id" INTEGER NOT NULL,

    CONSTRAINT "car_submodel_pkey" PRIMARY KEY ("submodel_id")
);

-- CreateTable
CREATE TABLE "car_submodel_variant" (
    "variant_id" SERIAL NOT NULL,
    "variant_name" TEXT NOT NULL,
    "submodel_id" INTEGER NOT NULL,

    CONSTRAINT "car_submodel_variant_pkey" PRIMARY KEY ("variant_id")
);

-- CreateTable
CREATE TABLE "car" (
    "car_id" SERIAL NOT NULL,
    "car_code" TEXT NOT NULL,
    "status" "carStatus" NOT NULL DEFAULT 'car_entry',
    "car_tracking" "trackingStatus" DEFAULT 'pending',
    "purchase_date" TIMESTAMP(3),
    "license_plate_no" TEXT,
    "license_plate_province" TEXT,
    "new_license_plate_no" TEXT,
    "new_license_plate_province" TEXT,
    "color_id" INTEGER,
    "chassis_no" TEXT,
    "engine_no" TEXT,
    "brand_id" INTEGER NOT NULL,
    "model_id" INTEGER NOT NULL,
    "submodel_id" INTEGER NOT NULL,
    "mileage" INTEGER,
    "registration_date" TIMESTAMP(3),
    "registration_date_year" INTEGER,
    "registration_date_month" INTEGER,
    "registration_date_day" INTEGER,
    "day" INTEGER,
    "month" INTEGER,
    "year" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "car_pkey" PRIMARY KEY ("car_id")
);

-- CreateTable
CREATE TABLE "carFinancialDetails" (
    "id" SERIAL NOT NULL,
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
    "approval_amount" DOUBLE PRECISION,
    "expected_income" DOUBLE PRECISION,
    "expected_profit" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "carFinancialDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carExpenseDetails" (
    "id" SERIAL NOT NULL,
    "car_id" INTEGER NOT NULL,
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
    "new_tires" DOUBLE PRECISION,
    "installment_support" DOUBLE PRECISION,
    "cash_back" DOUBLE PRECISION,
    "other_promotions" TEXT,
    "total_promotion_expenses" DOUBLE PRECISION,
    "final_profit" DOUBLE PRECISION,
    "total_expenses" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "carExpenseDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carApprovalDetails" (
    "id" SERIAL NOT NULL,
    "car_id" INTEGER NOT NULL,
    "approval_status" BOOLEAN DEFAULT false,
    "booked_status" BOOLEAN DEFAULT false,
    "payment_status" BOOLEAN DEFAULT false,
    "approval_order" INTEGER,
    "payment_order" INTEGER,
    "approval_date" TIMESTAMP(3),
    "booked_date" TIMESTAMP(3),
    "payment_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "carApprovalDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carLocationDetails" (
    "id" SERIAL NOT NULL,
    "car_id" INTEGER NOT NULL,
    "parking_id" INTEGER NOT NULL,
    "sale_branch_id" INTEGER,
    "branch_50_percent_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "carLocationDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carTaxDetails" (
    "id" SERIAL NOT NULL,
    "car_id" INTEGER NOT NULL,
    "tax_invoice_sale_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "carTaxDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarPurchaseTaxInvoice" (
    "car_tax_details_id" INTEGER NOT NULL,
    "purchase_invoice_id" INTEGER NOT NULL,

    CONSTRAINT "CarPurchaseTaxInvoice_pkey" PRIMARY KEY ("car_tax_details_id","purchase_invoice_id")
);

-- CreateTable
CREATE TABLE "CarWithholdingTaxInvoice" (
    "car_tax_details_id" INTEGER NOT NULL,
    "withholding_invoice_id" INTEGER NOT NULL,

    CONSTRAINT "CarWithholdingTaxInvoice_pkey" PRIMARY KEY ("car_tax_details_id","withholding_invoice_id")
);

-- CreateTable
CREATE TABLE "CarSaleTaxInvoice" (
    "car_tax_details_id" INTEGER NOT NULL,
    "invoice_id" INTEGER NOT NULL,

    CONSTRAINT "CarSaleTaxInvoice_pkey" PRIMARY KEY ("car_tax_details_id","invoice_id")
);

-- CreateTable
CREATE TABLE "carDocumentTracking" (
    "id" SERIAL NOT NULL,
    "car_id" INTEGER NOT NULL,
    "fp_due_date" TIMESTAMP(3),
    "book_close_date" TIMESTAMP(3),
    "book_sent_to_bank_date" TIMESTAMP(3),
    "transfer_status" "transferStatus" DEFAULT 'pending',
    "book_record" TEXT,
    "installment_amount" DOUBLE PRECISION,
    "installment_number" INTEGER,
    "financing_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "carDocumentTracking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carAssociatedEntities" (
    "id" SERIAL NOT NULL,
    "car_id" INTEGER NOT NULL,
    "purchase_from_id" INTEGER,
    "customer_id" INTEGER,
    "salesperson_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "carAssociatedEntities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carGeneralInfo" (
    "id" SERIAL NOT NULL,
    "car_id" INTEGER NOT NULL,
    "fp_name" TEXT,
    "promotion_detail" TEXT,
    "tracking_note" TEXT,
    "note" TEXT,
    "car_image_link" TEXT,
    "car_release_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "carGeneralInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer" (
    "customer_id" SERIAL NOT NULL,
    "customer_code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "branch" TEXT,
    "phone" TEXT,
    "email" TEXT,
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
    "customer_id" INTEGER NOT NULL,
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
    "customer_id" INTEGER NOT NULL,
    "sale_date" TIMESTAMP(3) NOT NULL,
    "sale_price" DOUBLE PRECISION NOT NULL,
    "salesperson_id" INTEGER NOT NULL,
    "branchBranch_id" INTEGER,

    CONSTRAINT "sale_pkey" PRIMARY KEY ("sale_id")
);

-- CreateTable
CREATE TABLE "employee" (
    "employee_id" SERIAL NOT NULL,
    "employee_code" TEXT NOT NULL,
    "title" TEXT,
    "full_name" TEXT NOT NULL,
    "nickname" TEXT,
    "position" TEXT NOT NULL,
    "branch_id" INTEGER NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profile_picture" TEXT,
    "employment_status" "employeeStatus" NOT NULL DEFAULT 'active',
    "employee_card" "empCardStatus" NOT NULL DEFAULT 'yes',
    "line_uuid" TEXT,
    "isFirstLogin" BOOLEAN NOT NULL DEFAULT true,
    "role" "role" NOT NULL DEFAULT 'user',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

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
    "inspector_id" INTEGER NOT NULL,
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
    "employee_id" INTEGER NOT NULL,
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
    "supplier_name" TEXT,
    "branch_name" TEXT,
    "tax_id" VARCHAR(13),

    CONSTRAINT "supplier_pkey" PRIMARY KEY ("supplier_id")
);

-- CreateTable
CREATE TABLE "customerPurchaseHistory" (
    "history_id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
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
    "employee_code" TEXT NOT NULL,
    "check_in_time" TIMESTAMP(3),
    "check_out_time" TIMESTAMP(3),
    "check_in_latitude" DOUBLE PRECISION,
    "check_in_longitude" DOUBLE PRECISION,
    "check_out_latitude" DOUBLE PRECISION,
    "check_out_longitude" DOUBLE PRECISION,
    "status" "attendanceStatus" NOT NULL,
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
    "invoice_date" TIMESTAMP(3) NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "sale_price_before_vat" DOUBLE PRECISION,
    "vat_7_percent" DOUBLE PRECISION,
    "sale_price_incl_vat" DOUBLE PRECISION,
    "invoice_type" TEXT NOT NULL,

    CONSTRAINT "taxInvoice_pkey" PRIMARY KEY ("invoice_id")
);

-- CreateTable
CREATE TABLE "purchaseTaxInvoice" (
    "purchase_invoice_id" SERIAL NOT NULL,
    "invoice_date" TIMESTAMP(3) NOT NULL,
    "invoice_number" TEXT NOT NULL,
    "supplier_id" INTEGER NOT NULL,
    "product_value_before_vat" DOUBLE PRECISION,
    "vat_7_percent" DOUBLE PRECISION,
    "product_value_incl_operations" DOUBLE PRECISION,
    "no_vat" BOOLEAN NOT NULL,

    CONSTRAINT "purchaseTaxInvoice_pkey" PRIMARY KEY ("purchase_invoice_id")
);

-- CreateTable
CREATE TABLE "withholdingTaxInvoice" (
    "withholding_invoice_id" SERIAL NOT NULL,
    "invoice_date" TIMESTAMP(3) NOT NULL,
    "invoice_number" TEXT NOT NULL,
    "vat_3_percent" DOUBLE PRECISION,

    CONSTRAINT "withholdingTaxInvoice_pkey" PRIMARY KEY ("withholding_invoice_id")
);

-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" SERIAL NOT NULL,
    "employee_code" TEXT,
    "admin_id" INTEGER,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companies" (
    "id" SERIAL NOT NULL,
    "company_code" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "contact_person" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admins" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "AdminRole" NOT NULL DEFAULT 'admin',
    "status" BOOLEAN NOT NULL DEFAULT true,
    "last_login" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "company_id" INTEGER,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_logs" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "level" "LogLevel" NOT NULL,
    "type" TEXT NOT NULL,
    "user_id" INTEGER,
    "employee_id" INTEGER,
    "action" TEXT NOT NULL,
    "details" JSONB,
    "ip" TEXT NOT NULL,
    "user_agent" TEXT,

    CONSTRAINT "system_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_settings" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "description" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "system_settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "color_color_name_key" ON "color"("color_name");

-- CreateIndex
CREATE UNIQUE INDEX "followUp_followUpId_key" ON "followUp"("followUpId");

-- CreateIndex
CREATE INDEX "followUp_customer_id_idx" ON "followUp"("customer_id");

-- CreateIndex
CREATE INDEX "followUp_employee_id_idx" ON "followUp"("employee_id");

-- CreateIndex
CREATE UNIQUE INDEX "province_code_key" ON "province"("code");

-- CreateIndex
CREATE UNIQUE INDEX "car_brand_brand_name_key" ON "car_brand"("brand_name");

-- CreateIndex
CREATE UNIQUE INDEX "car_car_code_key" ON "car"("car_code");

-- CreateIndex
CREATE INDEX "car_car_id_idx" ON "car"("car_id");

-- CreateIndex
CREATE INDEX "car_car_code_idx" ON "car"("car_code");

-- CreateIndex
CREATE UNIQUE INDEX "customer_customer_code_key" ON "customer"("customer_code");

-- CreateIndex
CREATE UNIQUE INDEX "customer_phone_key" ON "customer"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "customer_email_key" ON "customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "employee_employee_code_key" ON "employee"("employee_code");

-- CreateIndex
CREATE UNIQUE INDEX "employee_phone_key" ON "employee"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "employee_email_key" ON "employee"("email");

-- CreateIndex
CREATE INDEX "employee_email_idx" ON "employee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "bankEmployee_phone_key" ON "bankEmployee"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "bankEmployee_email_key" ON "bankEmployee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "branch_phone_key" ON "branch"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "purchaseTaxInvoice_invoice_number_key" ON "purchaseTaxInvoice"("invoice_number");

-- CreateIndex
CREATE UNIQUE INDEX "withholdingTaxInvoice_invoice_number_key" ON "withholdingTaxInvoice"("invoice_number");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_employee_code_key" ON "RefreshToken"("employee_code");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_admin_id_key" ON "RefreshToken"("admin_id");

-- CreateIndex
CREATE UNIQUE INDEX "companies_company_code_key" ON "companies"("company_code");

-- CreateIndex
CREATE UNIQUE INDEX "admins_username_key" ON "admins"("username");

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");

-- CreateIndex
CREATE UNIQUE INDEX "system_settings_key_key" ON "system_settings"("key");

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
ALTER TABLE "car_model" ADD CONSTRAINT "car_model_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "car_brand"("brand_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car_submodel" ADD CONSTRAINT "car_submodel_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "car_model"("model_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car_submodel_variant" ADD CONSTRAINT "car_submodel_variant_submodel_id_fkey" FOREIGN KEY ("submodel_id") REFERENCES "car_submodel"("submodel_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car" ADD CONSTRAINT "car_color_id_fkey" FOREIGN KEY ("color_id") REFERENCES "color"("color_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car" ADD CONSTRAINT "car_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "car_brand"("brand_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car" ADD CONSTRAINT "car_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "car_model"("model_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car" ADD CONSTRAINT "car_submodel_id_fkey" FOREIGN KEY ("submodel_id") REFERENCES "car_submodel"("submodel_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carFinancialDetails" ADD CONSTRAINT "carFinancialDetails_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "car"("car_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carExpenseDetails" ADD CONSTRAINT "carExpenseDetails_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "car"("car_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carApprovalDetails" ADD CONSTRAINT "carApprovalDetails_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "car"("car_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carLocationDetails" ADD CONSTRAINT "carLocationDetails_parking_id_fkey" FOREIGN KEY ("parking_id") REFERENCES "branch"("branch_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carLocationDetails" ADD CONSTRAINT "carLocationDetails_sale_branch_id_fkey" FOREIGN KEY ("sale_branch_id") REFERENCES "branch"("branch_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carLocationDetails" ADD CONSTRAINT "carLocationDetails_branch_50_percent_id_fkey" FOREIGN KEY ("branch_50_percent_id") REFERENCES "branch"("branch_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carLocationDetails" ADD CONSTRAINT "carLocationDetails_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "car"("car_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carTaxDetails" ADD CONSTRAINT "carTaxDetails_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "car"("car_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarPurchaseTaxInvoice" ADD CONSTRAINT "CarPurchaseTaxInvoice_car_tax_details_id_fkey" FOREIGN KEY ("car_tax_details_id") REFERENCES "carTaxDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarPurchaseTaxInvoice" ADD CONSTRAINT "CarPurchaseTaxInvoice_purchase_invoice_id_fkey" FOREIGN KEY ("purchase_invoice_id") REFERENCES "purchaseTaxInvoice"("purchase_invoice_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarWithholdingTaxInvoice" ADD CONSTRAINT "CarWithholdingTaxInvoice_car_tax_details_id_fkey" FOREIGN KEY ("car_tax_details_id") REFERENCES "carTaxDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarWithholdingTaxInvoice" ADD CONSTRAINT "CarWithholdingTaxInvoice_withholding_invoice_id_fkey" FOREIGN KEY ("withholding_invoice_id") REFERENCES "withholdingTaxInvoice"("withholding_invoice_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarSaleTaxInvoice" ADD CONSTRAINT "CarSaleTaxInvoice_car_tax_details_id_fkey" FOREIGN KEY ("car_tax_details_id") REFERENCES "carTaxDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarSaleTaxInvoice" ADD CONSTRAINT "CarSaleTaxInvoice_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "taxInvoice"("invoice_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carDocumentTracking" ADD CONSTRAINT "carDocumentTracking_financing_id_fkey" FOREIGN KEY ("financing_id") REFERENCES "customer"("customer_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carDocumentTracking" ADD CONSTRAINT "carDocumentTracking_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "car"("car_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carAssociatedEntities" ADD CONSTRAINT "carAssociatedEntities_purchase_from_id_fkey" FOREIGN KEY ("purchase_from_id") REFERENCES "supplier"("supplier_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carAssociatedEntities" ADD CONSTRAINT "carAssociatedEntities_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("customer_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carAssociatedEntities" ADD CONSTRAINT "carAssociatedEntities_salesperson_id_fkey" FOREIGN KEY ("salesperson_id") REFERENCES "employee"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carAssociatedEntities" ADD CONSTRAINT "carAssociatedEntities_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "car"("car_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carGeneralInfo" ADD CONSTRAINT "carGeneralInfo_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "car"("car_id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE "customerPurchaseHistory" ADD CONSTRAINT "customerPurchaseHistory_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customerPurchaseHistory" ADD CONSTRAINT "customerPurchaseHistory_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "car"("car_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bankTransferTracking" ADD CONSTRAINT "bankTransferTracking_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "car"("car_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bankTransferTracking" ADD CONSTRAINT "bankTransferTracking_bank_employee_id_fkey" FOREIGN KEY ("bank_employee_id") REFERENCES "bankEmployee"("bank_employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_employee_code_fkey" FOREIGN KEY ("employee_code") REFERENCES "employee"("employee_code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "liveSchedule" ADD CONSTRAINT "liveSchedule_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branch"("branch_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "taxInvoice" ADD CONSTRAINT "taxInvoice_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchaseTaxInvoice" ADD CONSTRAINT "purchaseTaxInvoice_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "supplier"("supplier_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_employee_code_fkey" FOREIGN KEY ("employee_code") REFERENCES "employee"("employee_code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admins" ADD CONSTRAINT "admins_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "system_logs" ADD CONSTRAINT "system_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "system_logs" ADD CONSTRAINT "system_logs_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employee"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;
