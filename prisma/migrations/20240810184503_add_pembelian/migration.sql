/*
  Warnings:

  - You are about to drop the column `batikid` on the `beli` table. All the data in the column will be lost.
  - You are about to drop the column `customerid` on the `beli` table. All the data in the column will be lost.
  - Added the required column `batikId` to the `beli` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerId` to the `beli` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "beli" DROP CONSTRAINT "beli_batikid_fkey";

-- DropForeignKey
ALTER TABLE "beli" DROP CONSTRAINT "beli_customerid_fkey";

-- AlterTable
ALTER TABLE "beli" DROP COLUMN "batikid",
DROP COLUMN "customerid",
ADD COLUMN     "batikId" INTEGER NOT NULL,
ADD COLUMN     "customerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "beli" ADD CONSTRAINT "beli_batikId_fkey" FOREIGN KEY ("batikId") REFERENCES "batik"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "beli" ADD CONSTRAINT "beli_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
