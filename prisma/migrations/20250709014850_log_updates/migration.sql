-- DropForeignKey
ALTER TABLE "transaksiLog" DROP CONSTRAINT "transaksiLog_batikId_fkey";

-- DropForeignKey
ALTER TABLE "transaksiLog" DROP CONSTRAINT "transaksiLog_customerId_fkey";

-- DropForeignKey
ALTER TABLE "transaksiLog" DROP CONSTRAINT "transaksiLog_pembelianId_fkey";

-- AlterTable
ALTER TABLE "transaksiLog" ALTER COLUMN "batikId" DROP NOT NULL,
ALTER COLUMN "customerId" DROP NOT NULL,
ALTER COLUMN "keterangan" DROP NOT NULL,
ALTER COLUMN "quantity" DROP NOT NULL,
ALTER COLUMN "pembelianId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "transaksiLog" ADD CONSTRAINT "transaksiLog_batikId_fkey" FOREIGN KEY ("batikId") REFERENCES "batik"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaksiLog" ADD CONSTRAINT "transaksiLog_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaksiLog" ADD CONSTRAINT "transaksiLog_pembelianId_fkey" FOREIGN KEY ("pembelianId") REFERENCES "pembelian"("id") ON DELETE SET NULL ON UPDATE CASCADE;
