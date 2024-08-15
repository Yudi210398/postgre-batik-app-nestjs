/*
  Warnings:

  - You are about to drop the `beli` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "beli" DROP CONSTRAINT "beli_batikId_fkey";

-- DropForeignKey
ALTER TABLE "beli" DROP CONSTRAINT "beli_customerId_fkey";

-- DropTable
DROP TABLE "beli";
