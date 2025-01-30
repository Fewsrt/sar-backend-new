-- DropForeignKey
ALTER TABLE "carGeneralInfo" DROP CONSTRAINT "carGeneralInfo_fp_id_fkey";

-- AlterTable
ALTER TABLE "carGeneralInfo" ALTER COLUMN "fp_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "carGeneralInfo" ADD CONSTRAINT "carGeneralInfo_fp_id_fkey" FOREIGN KEY ("fp_id") REFERENCES "floorplanfinancing"("id") ON DELETE SET NULL ON UPDATE CASCADE;
