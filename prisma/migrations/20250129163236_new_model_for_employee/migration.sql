/*
  Warnings:

  - The values [checked_in,checked_out] on the enum `attendanceStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "leavetype" AS ENUM ('SICK', 'VACATION', 'PERSONAL', 'UNPAID');

-- CreateEnum
CREATE TYPE "leavestatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterEnum
BEGIN;
CREATE TYPE "attendanceStatus_new" AS ENUM ('PRESENT', 'ABSENT', 'LATE', 'ON_LEAVE');
ALTER TABLE "attendance" ALTER COLUMN "status" TYPE "attendanceStatus_new" USING ("status"::text::"attendanceStatus_new");
ALTER TYPE "attendanceStatus" RENAME TO "attendanceStatus_old";
ALTER TYPE "attendanceStatus_new" RENAME TO "attendanceStatus";
DROP TYPE "attendanceStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "attendance" ADD COLUMN     "salaryId" INTEGER,
ADD COLUMN     "work_hours" DOUBLE PRECISION DEFAULT 0;

-- CreateTable
CREATE TABLE "salary" (
    "id" SERIAL NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "base_salary" DOUBLE PRECISION NOT NULL,
    "bonus" DOUBLE PRECISION,
    "deductions" DOUBLE PRECISION,
    "total_salary" DOUBLE PRECISION NOT NULL,
    "pay_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "salary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leaverequest" (
    "id" SERIAL NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "leave_type" "leavetype" NOT NULL,
    "status" "leavestatus" NOT NULL DEFAULT 'PENDING',
    "reason" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "leaverequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_salaryId_fkey" FOREIGN KEY ("salaryId") REFERENCES "salary"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salary" ADD CONSTRAINT "salary_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leaverequest" ADD CONSTRAINT "leaverequest_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;
