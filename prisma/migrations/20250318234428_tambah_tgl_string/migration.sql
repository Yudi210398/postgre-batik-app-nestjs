/*
  Warnings:

  - Added the required column `tanggalString` to the `PenambahanStock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PenambahanStock" ADD COLUMN     "tanggalString" VARCHAR(100) NOT NULL;
