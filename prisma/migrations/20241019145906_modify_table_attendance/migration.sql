/*
  Warnings:

  - You are about to drop the column `line_uuid` on the `attendance` table. All the data in the column will be lost.
  - Changed the type of `status` on the `attendance` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "attendanceStatus" AS ENUM ('checked_in', 'checked_out');

-- DropIndex
DROP INDEX "attendance_line_uuid_key";

-- AlterTable
ALTER TABLE "attendance" DROP COLUMN "line_uuid",
DROP COLUMN "status",
ADD COLUMN     "status" "attendanceStatus" NOT NULL;
