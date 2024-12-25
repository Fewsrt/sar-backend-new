/*
  Warnings:

  - You are about to drop the column `employee_id` on the `attendance` table. All the data in the column will be lost.
  - Added the required column `employee_code` to the `attendance` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "attendance" DROP CONSTRAINT "attendance_employee_id_fkey";

-- AlterTable
ALTER TABLE "attendance" DROP COLUMN "employee_id",
ADD COLUMN     "employee_code" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_employee_code_fkey" FOREIGN KEY ("employee_code") REFERENCES "employee"("employee_code") ON DELETE RESTRICT ON UPDATE CASCADE;
