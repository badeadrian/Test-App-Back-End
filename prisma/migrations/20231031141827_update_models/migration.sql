/*
  Warnings:

  - You are about to drop the column `dueDate` on the `Bill` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Bill` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Invoice` table. All the data in the column will be lost.
  - Added the required column `amount` to the `Bill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `due_date` to the `Bill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Bill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `due_date` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bill" DROP CONSTRAINT "Bill_userId_fkey";

-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_userId_fkey";

-- AlterTable
ALTER TABLE "Bill" DROP COLUMN "dueDate",
DROP COLUMN "userId",
ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "due_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "userId",
ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "due_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bill" ADD CONSTRAINT "Bill_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
