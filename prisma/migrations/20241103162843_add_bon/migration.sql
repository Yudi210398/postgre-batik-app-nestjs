/*
  Warnings:

  - The `nomorBon` column on the `pembelian` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "pembelian" DROP COLUMN "nomorBon",
ADD COLUMN     "nomorBon" UUID NOT NULL DEFAULT gen_random_uuid();

-- CreateIndex
CREATE UNIQUE INDEX "pembelian_nomorBon_key" ON "pembelian"("nomorBon");
