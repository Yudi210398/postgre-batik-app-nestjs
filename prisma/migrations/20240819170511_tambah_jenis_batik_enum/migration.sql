/*
  Warnings:

  - Added the required column `jenisBatik` to the `batik` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "JenisBatik" AS ENUM ('Sutra', 'Katun');

-- AlterTable
ALTER TABLE "batik" ADD COLUMN     "jenisBatik" "JenisBatik" NOT NULL;
