/*
  Warnings:

  - Added the required column `tanggalString` to the `batik` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "batik" ADD COLUMN     "tanggalString" VARCHAR(100) NOT NULL;
