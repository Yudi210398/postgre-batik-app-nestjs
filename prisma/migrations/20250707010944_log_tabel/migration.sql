-- CreateTable
CREATE TABLE "transaksiLog" (
    "id" SERIAL NOT NULL,
    "batikId" INTEGER NOT NULL,
    "customerId" INTEGER NOT NULL,
    "keterangan" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggalString" VARCHAR(100) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "jenis" TEXT NOT NULL,

    CONSTRAINT "transaksiLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "transaksiLog" ADD CONSTRAINT "transaksiLog_batikId_fkey" FOREIGN KEY ("batikId") REFERENCES "batik"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaksiLog" ADD CONSTRAINT "transaksiLog_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
