/*
  Warnings:

  - You are about to drop the column `book_record_date` on the `car` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "car" DROP COLUMN "book_record_date",
ADD COLUMN     "book_record" TEXT;
