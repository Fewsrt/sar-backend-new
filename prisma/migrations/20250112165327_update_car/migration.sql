-- AlterTable
ALTER TABLE "bankEmployee" ADD COLUMN     "branch_id" INTEGER;

-- AddForeignKey
ALTER TABLE "bankEmployee" ADD CONSTRAINT "bankEmployee_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branch"("branch_id") ON DELETE SET NULL ON UPDATE CASCADE;
