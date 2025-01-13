-- DropForeignKey
ALTER TABLE "carLocationDetails" DROP CONSTRAINT "carLocationDetails_parking_id_fkey";

-- AlterTable
ALTER TABLE "carLocationDetails" ALTER COLUMN "parking_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "carLocationDetails" ADD CONSTRAINT "carLocationDetails_parking_id_fkey" FOREIGN KEY ("parking_id") REFERENCES "branch"("branch_id") ON DELETE SET NULL ON UPDATE CASCADE;
