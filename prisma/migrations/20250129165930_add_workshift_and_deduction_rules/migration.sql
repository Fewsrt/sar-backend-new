-- AlterTable
ALTER TABLE "attendance" ADD COLUMN     "deduction_amount" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "is_half_day_absent" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "late_minutes" INTEGER DEFAULT 0,
ADD COLUMN     "work_shift_id" INTEGER;

-- AlterTable
ALTER TABLE "employee" ADD COLUMN     "work_shift_id" INTEGER;

-- CreateTable
CREATE TABLE "workshift" (
    "id" SERIAL NOT NULL,
    "shift_name" TEXT NOT NULL,
    "start_time" TEXT NOT NULL,
    "end_time" TEXT NOT NULL,
    "grace_period" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workshift_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deductionrule" (
    "id" SERIAL NOT NULL,
    "work_shift_id" INTEGER NOT NULL,
    "late_minutes" INTEGER NOT NULL,
    "deduction_amount" DOUBLE PRECISION NOT NULL,
    "is_half_day" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "deductionrule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_work_shift_id_fkey" FOREIGN KEY ("work_shift_id") REFERENCES "workshift"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_work_shift_id_fkey" FOREIGN KEY ("work_shift_id") REFERENCES "workshift"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deductionrule" ADD CONSTRAINT "deductionrule_work_shift_id_fkey" FOREIGN KEY ("work_shift_id") REFERENCES "workshift"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
