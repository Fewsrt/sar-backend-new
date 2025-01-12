-- DropForeignKey
ALTER TABLE "car" DROP CONSTRAINT "car_parking_id_fkey";

-- AlterTable
ALTER TABLE "car" ALTER COLUMN "parking_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "car" ADD CONSTRAINT "car_parking_id_fkey" FOREIGN KEY ("parking_id") REFERENCES "branch"("branch_id") ON DELETE SET NULL ON UPDATE CASCADE;
