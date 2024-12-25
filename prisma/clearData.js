const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // ลบข้อมูลตารางที่มีการเชื่อมโยงกันในลำดับที่ถูกต้อง (เริ่มจากตารางลูก)
  await prisma.subdistrict.deleteMany();
  await prisma.district.deleteMany();
  await prisma.province.deleteMany();
  await prisma.followUp.deleteMany();
  await prisma.customerPurchaseHistory.deleteMany();
  await prisma.sale.deleteMany();
  await prisma.reservation.deleteMany();
  await prisma.car.deleteMany();
  await prisma.carInspection.deleteMany();
  await prisma.maintenance.deleteMany();
  await prisma.accounting.deleteMany();
  await prisma.employee.deleteMany();
  await prisma.supplier.deleteMany();
  await prisma.taxInvoice.deleteMany();
  await prisma.purchaseTaxInvoice.deleteMany();
  await prisma.bankEmployee.deleteMany();
  await prisma.branch.deleteMany();

  // ลบข้อมูลที่เชื่อมโยงกับ carBrand ในลำดับที่ถูกต้อง
  await prisma.carSubModel.deleteMany();
  await prisma.carModel.deleteMany();
  await prisma.carBrand.deleteMany(); // ลบ carBrand หลังจากลบ carModel และ carSubModel
  
  console.log('All data has been deleted successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
