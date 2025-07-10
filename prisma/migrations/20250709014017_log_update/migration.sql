/*
  Warnings:

  - Added the required column `pembelianId` to the `transaksiLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transaksiLog" ADD COLUMN     "pembelianId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "transaksiLog" ADD CONSTRAINT "transaksiLog_pembelianId_fkey" FOREIGN KEY ("pembelianId") REFERENCES "pembelian"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
