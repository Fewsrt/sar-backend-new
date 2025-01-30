-- CreateEnum
CREATE TYPE "VehicleType" AS ENUM ('CAR', 'MOTORCYCLE');

-- DropForeignKey
ALTER TABLE "car" DROP CONSTRAINT "car_brand_id_fkey";

-- DropForeignKey
ALTER TABLE "car" DROP CONSTRAINT "car_model_id_fkey";

-- DropForeignKey
ALTER TABLE "car" DROP CONSTRAINT "car_submodel_id_fkey";

-- AlterTable
ALTER TABLE "car" ADD COLUMN     "car_brand_id" INTEGER,
ADD COLUMN     "car_model_id" INTEGER,
ADD COLUMN     "car_submodel_id" INTEGER,
ADD COLUMN     "moto_brand_id" INTEGER,
ADD COLUMN     "moto_model_id" INTEGER,
ADD COLUMN     "moto_submodel_id" INTEGER,
ADD COLUMN     "vehicle_type" "VehicleType" NOT NULL DEFAULT 'CAR',
ALTER COLUMN "brand_id" DROP NOT NULL,
ALTER COLUMN "model_id" DROP NOT NULL,
ALTER COLUMN "submodel_id" DROP NOT NULL;

-- CreateTable
CREATE TABLE "moto_brand" (
    "brand_id" SERIAL NOT NULL,
    "brand_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "moto_brand_pkey" PRIMARY KEY ("brand_id")
);

-- CreateTable
CREATE TABLE "moto_model" (
    "model_id" SERIAL NOT NULL,
    "model_name" TEXT NOT NULL,
    "brand_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "moto_model_pkey" PRIMARY KEY ("model_id")
);

-- CreateTable
CREATE TABLE "moto_submodel" (
    "submodel_id" SERIAL NOT NULL,
    "submodel_name" TEXT NOT NULL,
    "model_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "moto_submodel_pkey" PRIMARY KEY ("submodel_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "moto_brand_brand_name_key" ON "moto_brand"("brand_name");

-- AddForeignKey
ALTER TABLE "car" ADD CONSTRAINT "car_car_brand_id_fkey" FOREIGN KEY ("car_brand_id") REFERENCES "car_brand"("brand_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car" ADD CONSTRAINT "car_car_model_id_fkey" FOREIGN KEY ("car_model_id") REFERENCES "car_model"("model_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car" ADD CONSTRAINT "car_car_submodel_id_fkey" FOREIGN KEY ("car_submodel_id") REFERENCES "car_submodel"("submodel_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car" ADD CONSTRAINT "car_moto_brand_id_fkey" FOREIGN KEY ("moto_brand_id") REFERENCES "moto_brand"("brand_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car" ADD CONSTRAINT "car_moto_model_id_fkey" FOREIGN KEY ("moto_model_id") REFERENCES "moto_model"("model_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car" ADD CONSTRAINT "car_moto_submodel_id_fkey" FOREIGN KEY ("moto_submodel_id") REFERENCES "moto_submodel"("submodel_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "moto_model" ADD CONSTRAINT "moto_model_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "moto_brand"("brand_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "moto_submodel" ADD CONSTRAINT "moto_submodel_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "moto_model"("model_id") ON DELETE RESTRICT ON UPDATE CASCADE;
