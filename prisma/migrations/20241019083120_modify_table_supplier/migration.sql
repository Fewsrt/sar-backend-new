/*
  Warnings:

  - The `salesperson_id` column on the `car` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `employee` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `employee_id` column on the `employee` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `employee_id` on the `attendance` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `inspector_id` on the `carInspection` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `employee_id` on the `followUp` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `employee_id` on the `maintenance` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `salesperson_id` on the `sale` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "attendance" DROP CONSTRAINT "attendance_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "car" DROP CONSTRAINT "car_salesperson_id_fkey";

-- DropForeignKey
ALTER TABLE "carInspection" DROP CONSTRAINT "carInspection_inspector_id_fkey";

-- DropForeignKey
ALTER TABLE "followUp" DROP CONSTRAINT "followUp_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "maintenance" DROP CONSTRAINT "maintenance_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "sale" DROP CONSTRAINT "sale_salesperson_id_fkey";

-- AlterTable
ALTER TABLE "attendance" DROP COLUMN "employee_id",
ADD COLUMN     "employee_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "car" DROP COLUMN "salesperson_id",
ADD COLUMN     "salesperson_id" INTEGER;

-- AlterTable
ALTER TABLE "carInspection" DROP COLUMN "inspector_id",
ADD COLUMN     "inspector_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "employee" DROP CONSTRAINT "employee_pkey",
DROP COLUMN "employee_id",
ADD COLUMN     "employee_id" SERIAL NOT NULL,
ADD CONSTRAINT "employee_pkey" PRIMARY KEY ("employee_id");

-- AlterTable
ALTER TABLE "followUp" DROP COLUMN "employee_id",
ADD COLUMN     "employee_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "maintenance" DROP COLUMN "employee_id",
ADD COLUMN     "employee_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "sale" DROP COLUMN "salesperson_id",
ADD COLUMN     "salesperson_id" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "followUp_employee_id_idx" ON "followUp"("employee_id");

-- AddForeignKey
ALTER TABLE "followUp" ADD CONSTRAINT "followUp_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car" ADD CONSTRAINT "car_salesperson_id_fkey" FOREIGN KEY ("salesperson_id") REFERENCES "employee"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale" ADD CONSTRAINT "sale_salesperson_id_fkey" FOREIGN KEY ("salesperson_id") REFERENCES "employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carInspection" ADD CONSTRAINT "carInspection_inspector_id_fkey" FOREIGN KEY ("inspector_id") REFERENCES "employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance" ADD CONSTRAINT "maintenance_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;
