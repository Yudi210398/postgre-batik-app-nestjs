/*
  Warnings:

  - You are about to drop the column `tanggal` on the `LaporanBulanan` table. All the data in the column will be lost.
  - Added the required column `jumlah_terjual` to the `LaporanBulanan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LaporanBulanan" DROP COLUMN "tanggal",
ADD COLUMN     "bulan" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "jumlah_penambahan" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "jumlah_terjual" INTEGER NOT NULL;
