-- AlterTable
ALTER TABLE "system_logs" ADD COLUMN     "employee_id" INTEGER;

-- AddForeignKey
ALTER TABLE "system_logs" ADD CONSTRAINT "system_logs_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employee"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;
