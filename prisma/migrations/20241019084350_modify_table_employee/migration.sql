/*
  Warnings:

  - The `employment_status` column on the `employee` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `employee_card` column on the `employee` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "employee" DROP COLUMN "employment_status",
ADD COLUMN     "employment_status" "employeeStatus" NOT NULL DEFAULT 'active',
DROP COLUMN "employee_card",
ADD COLUMN     "employee_card" "empCardStatus" NOT NULL DEFAULT 'yes';
