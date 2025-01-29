-- AlterTable
ALTER TABLE "branch" ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "longitude" DOUBLE PRECISION,
ADD COLUMN     "radius" INTEGER DEFAULT 100;

-- CreateIndex
CREATE INDEX "branch_latitude_longitude_idx" ON "branch"("latitude", "longitude");
