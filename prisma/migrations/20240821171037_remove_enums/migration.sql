/*
  Warnings:

  - You are about to drop the column `jenisBatiks` on the `batik` table. All the data in the column will be lost.
  - Added the required column `jenisBatik` to the `batik` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "batik" DROP COLUMN "jenisBatiks",
ADD COLUMN     "jenisBatik" VARCHAR(100) NOT NULL;
