/*
  Warnings:

  - Added the required column `nomorTelp` to the `customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "customer" ADD COLUMN     "nomorTelp" VARCHAR(100) NOT NULL;
