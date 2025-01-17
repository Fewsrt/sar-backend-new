/*
  Warnings:

  - You are about to drop the `carExpenseDetails` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "carExpenseDetails" DROP CONSTRAINT "carExpenseDetails_car_id_fkey";

-- DropTable
DROP TABLE "carExpenseDetails";

-- CreateTable
CREATE TABLE "expenseCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "expenseCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carExpense" (
    "id" SERIAL NOT NULL,
    "car_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "receipt_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "carExpense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carExpenseSummary" (
    "id" SERIAL NOT NULL,
    "car_id" INTEGER NOT NULL,
    "total_expenses" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "total_promotion_expenses" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "final_profit" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "carExpenseSummary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "expenseCategory_code_key" ON "expenseCategory"("code");

-- CreateIndex
CREATE UNIQUE INDEX "carExpenseSummary_car_id_key" ON "carExpenseSummary"("car_id");

-- AddForeignKey
ALTER TABLE "carExpense" ADD CONSTRAINT "carExpense_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "car"("car_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carExpense" ADD CONSTRAINT "carExpense_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "expenseCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carExpenseSummary" ADD CONSTRAINT "carExpenseSummary_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "car"("car_id") ON DELETE RESTRICT ON UPDATE CASCADE;
