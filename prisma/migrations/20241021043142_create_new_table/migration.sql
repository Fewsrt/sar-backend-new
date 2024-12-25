/*
  Warnings:

  - You are about to drop the `carBrand` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `carModel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `carSubModel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "car" DROP CONSTRAINT "car_brand_id_fkey";

-- DropForeignKey
ALTER TABLE "car" DROP CONSTRAINT "car_model_id_fkey";

-- DropForeignKey
ALTER TABLE "car" DROP CONSTRAINT "car_submodel_id_fkey";

-- DropForeignKey
ALTER TABLE "carModel" DROP CONSTRAINT "carModel_brand_id_fkey";

-- DropForeignKey
ALTER TABLE "carSubModel" DROP CONSTRAINT "carSubModel_model_id_fkey";

-- DropTable
DROP TABLE "carBrand";

-- DropTable
DROP TABLE "carModel";

-- DropTable
DROP TABLE "carSubModel";

-- CreateTable
CREATE TABLE "car_brand" (
    "brand_id" SERIAL NOT NULL,
    "brand_name" TEXT NOT NULL,

    CONSTRAINT "car_brand_pkey" PRIMARY KEY ("brand_id")
);

-- CreateTable
CREATE TABLE "car_model" (
    "model_id" SERIAL NOT NULL,
    "model_name" TEXT NOT NULL,
    "brand_id" INTEGER NOT NULL,

    CONSTRAINT "car_model_pkey" PRIMARY KEY ("model_id")
);

-- CreateTable
CREATE TABLE "car_submodel" (
    "submodel_id" SERIAL NOT NULL,
    "submodel_name" TEXT NOT NULL,
    "model_id" INTEGER NOT NULL,

    CONSTRAINT "car_submodel_pkey" PRIMARY KEY ("submodel_id")
);

-- CreateTable
CREATE TABLE "submodel_variant" (
    "variant_id" SERIAL NOT NULL,
    "variant_name" TEXT NOT NULL,
    "submodel_id" INTEGER NOT NULL,

    CONSTRAINT "submodel_variant_pkey" PRIMARY KEY ("variant_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "car_brand_brand_name_key" ON "car_brand"("brand_name");

-- AddForeignKey
ALTER TABLE "car_model" ADD CONSTRAINT "car_model_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "car_brand"("brand_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car_submodel" ADD CONSTRAINT "car_submodel_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "car_model"("model_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "submodel_variant" ADD CONSTRAINT "submodel_variant_submodel_id_fkey" FOREIGN KEY ("submodel_id") REFERENCES "car_submodel"("submodel_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car" ADD CONSTRAINT "car_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "car_brand"("brand_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car" ADD CONSTRAINT "car_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "car_model"("model_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car" ADD CONSTRAINT "car_submodel_id_fkey" FOREIGN KEY ("submodel_id") REFERENCES "car_submodel"("submodel_id") ON DELETE RESTRICT ON UPDATE CASCADE;
