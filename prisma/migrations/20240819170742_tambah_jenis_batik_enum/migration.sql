/*
  Warnings:

  - You are about to drop the column `jenisBatik` on the `batik` table. All the data in the column will be lost.
  - Added the required column `jenisBatiks` to the `batik` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "batik" DROP COLUMN "jenisBatik",
ADD COLUMN     "jenisBatiks" "JenisBatik" NOT NULL;
