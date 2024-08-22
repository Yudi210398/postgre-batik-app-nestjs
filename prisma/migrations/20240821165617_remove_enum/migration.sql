/*
  Warnings:

  - Changed the type of `jenisBatiks` on the `batik` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "batik" DROP COLUMN "jenisBatiks",
ADD COLUMN     "jenisBatiks" VARCHAR(100) NOT NULL;

-- DropEnum
DROP TYPE "JenisBatik";
