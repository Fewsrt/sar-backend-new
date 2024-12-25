/*
  Warnings:

  - A unique constraint covering the columns `[employee_code]` on the table `RefreshToken` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_employee_code_key" ON "RefreshToken"("employee_code");
