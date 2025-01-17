-- AlterTable
ALTER TABLE "carFinancialDetails" ADD COLUMN     "installment_price" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "carGeneralInfo" ADD COLUMN     "car_detail" TEXT,
ADD COLUMN     "ge_price" INTEGER,
ADD COLUMN     "kk_price" INTEGER,
ADD COLUMN     "scb_price" INTEGER,
ADD COLUMN     "t_price" INTEGER;
