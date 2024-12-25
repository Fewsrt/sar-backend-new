/*
  Warnings:

  - You are about to drop the `submodel_variant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "submodel_variant" DROP CONSTRAINT "submodel_variant_submodel_id_fkey";

-- DropTable
DROP TABLE "submodel_variant";

-- CreateTable
CREATE TABLE "car_submodel_variant" (
    "variant_id" SERIAL NOT NULL,
    "variant_name" TEXT NOT NULL,
    "submodel_id" INTEGER NOT NULL,

    CONSTRAINT "car_submodel_variant_pkey" PRIMARY KEY ("variant_id")
);

-- AddForeignKey
ALTER TABLE "car_submodel_variant" ADD CONSTRAINT "car_submodel_variant_submodel_id_fkey" FOREIGN KEY ("submodel_id") REFERENCES "car_submodel"("submodel_id") ON DELETE RESTRICT ON UPDATE CASCADE;
