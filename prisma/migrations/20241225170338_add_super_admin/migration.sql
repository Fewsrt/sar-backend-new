/*
  Warnings:

  - A unique constraint covering the columns `[admin_id]` on the table `RefreshToken` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "RefreshToken" DROP CONSTRAINT "RefreshToken_employee_code_fkey";

-- AlterTable
ALTER TABLE "RefreshToken" ADD COLUMN     "admin_id" INTEGER,
ALTER COLUMN "employee_code" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_admin_id_key" ON "RefreshToken"("admin_id");

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_employee_code_fkey" FOREIGN KEY ("employee_code") REFERENCES "employee"("employee_code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;
