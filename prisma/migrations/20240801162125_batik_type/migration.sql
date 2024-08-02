-- CreateTable
CREATE TABLE "batik" (
    "id" SERIAL NOT NULL,
    "typeBatik" VARCHAR(100) NOT NULL,
    "totalBatik" INTEGER NOT NULL,

    CONSTRAINT "batik_pkey" PRIMARY KEY ("id")
);
