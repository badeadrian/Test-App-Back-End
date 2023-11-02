import { PrismaClient } from '@prisma/client';
//Dummy data creator invoices and bills

const prisma = new PrismaClient();

async function seedDatabase() {
  const targetUserId = 13;

  const dummyInvoices = [
    { amount: 10050, dueDate: new Date(), details: "Dummy invoice details 1", userId: targetUserId },
    { amount: 20075, dueDate: new Date(), details: "Dummy invoice details 2", userId: targetUserId },
    { amount: 20075, dueDate: new Date(), details: "Dummy invoice details 2", userId: targetUserId},
  ];
  
  for (let invoice of dummyInvoices) {
    await prisma.invoice.create({
      data: invoice
    });
  }
  const dummyBills = [
    { amount: 5025, dueDate: new Date(), details: "Dummy bill details 1", userId: targetUserId },
    { amount: 7590, dueDate: new Date(), details: "Dummy bill details 2", userId: targetUserId },
  ];
  
  for (let bill of dummyBills) {
    await prisma.bill.create({
      data: bill
    });
  }

  console.log("Dummy data added successfully!");
}

seedDatabase()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });