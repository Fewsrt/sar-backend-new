/*
  Warnings:

  - You are about to drop the column `fp_name` on the `carGeneralInfo` table. All the data in the column will be lost.
  - Added the required column `fp_id` to the `carGeneralInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "carGeneralInfo" DROP COLUMN "fp_name",
ADD COLUMN     "fp_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "carGeneralInfo" ADD CONSTRAINT "carGeneralInfo_fp_id_fkey" FOREIGN KEY ("fp_id") REFERENCES "floorplanfinancing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
