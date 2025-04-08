-- DropIndex
DROP INDEX "pembelian_nomorBon_key";

-- AlterTable
ALTER TABLE "pembelian" ALTER COLUMN "nomorBon" SET DEFAULT 'data belum diisi';
