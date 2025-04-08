/*
  Warnings:

  - You are about to drop the column `tanggalString` on the `PenambahanStock` table. All the data in the column will be lost.
  - Added the required column `tanggalString` to the `pembelian` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PenambahanStock" DROP COLUMN "tanggalString";

-- AlterTable
ALTER TABLE "pembelian" ADD COLUMN     "tanggalString" VARCHAR(100) NOT NULL;
