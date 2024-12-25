/*
  Warnings:

  - Added the required column `color_id` to the `car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "car" ADD COLUMN     "color_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "color" (
    "color_id" SERIAL NOT NULL,
    "color_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "color_pkey" PRIMARY KEY ("color_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "color_color_name_key" ON "color"("color_name");

-- AddForeignKey
ALTER TABLE "car" ADD CONSTRAINT "car_color_id_fkey" FOREIGN KEY ("color_id") REFERENCES "color"("color_id") ON DELETE RESTRICT ON UPDATE CASCADE;
