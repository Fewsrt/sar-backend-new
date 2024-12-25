/*
  Warnings:

  - Made the column `brand_id` on table `car` required. This step will fail if there are existing NULL values in that column.
  - Made the column `model_id` on table `car` required. This step will fail if there are existing NULL values in that column.
  - Made the column `submodel_id` on table `car` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "car" DROP CONSTRAINT "car_brand_id_fkey";

-- DropForeignKey
ALTER TABLE "car" DROP CONSTRAINT "car_model_id_fkey";

-- DropForeignKey
ALTER TABLE "car" DROP CONSTRAINT "car_submodel_id_fkey";

-- AlterTable
ALTER TABLE "car" ALTER COLUMN "brand_id" SET NOT NULL,
ALTER COLUMN "model_id" SET NOT NULL,
ALTER COLUMN "submodel_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "car" ADD CONSTRAINT "car_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "car_brand"("brand_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car" ADD CONSTRAINT "car_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "car_model"("model_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car" ADD CONSTRAINT "car_submodel_id_fkey" FOREIGN KEY ("submodel_id") REFERENCES "car_submodel"("submodel_id") ON DELETE RESTRICT ON UPDATE CASCADE;
