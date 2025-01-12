/*
  Warnings:

  - You are about to drop the column `book_record_date` on the `carDocumentTracking` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "carDocumentTracking" DROP COLUMN "book_record_date",
ADD COLUMN     "book_record" TEXT;
