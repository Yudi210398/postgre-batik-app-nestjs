/*
  Warnings:

  - A unique constraint covering the columns `[nomorBon]` on the table `pembelian` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nomorBon` to the `pembelian` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pembelian" ADD COLUMN     "nomorBon" VARCHAR(100) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "pembelian_nomorBon_key" ON "pembelian"("nomorBon");
