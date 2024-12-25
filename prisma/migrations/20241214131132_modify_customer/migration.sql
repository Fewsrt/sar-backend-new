/*
  Warnings:

  - Added the required column `branch` to the `customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "customer" ADD COLUMN     "branch" TEXT NOT NULL;
