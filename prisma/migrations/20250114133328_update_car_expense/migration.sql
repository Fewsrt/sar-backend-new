/*
  Warnings:

  - You are about to drop the `expenseCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "carExpense" DROP CONSTRAINT "carExpense_category_id_fkey";

-- DropTable
DROP TABLE "expenseCategory";

-- CreateTable
CREATE TABLE "expensecategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "expensecategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "expensecategory_code_key" ON "expensecategory"("code");

-- AddForeignKey
ALTER TABLE "carExpense" ADD CONSTRAINT "carExpense_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "expensecategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
