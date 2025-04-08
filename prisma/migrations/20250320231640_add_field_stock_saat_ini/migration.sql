/*
  Warnings:

  - Added the required column `stockSaatIni` to the `batik` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "batik" ADD COLUMN     "stockSaatIni" INTEGER NOT NULL;
