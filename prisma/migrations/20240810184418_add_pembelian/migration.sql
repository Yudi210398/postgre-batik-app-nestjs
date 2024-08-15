-- CreateTable
CREATE TABLE beli (
    id SERIAL NOT NULL,
    batikId INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    customerId INTEGER NOT NULL,

    CONSTRAINT beli_pkey PRIMARY KEY (id)
);

-- AddForeignKey
ALTER TABLE beli ADD CONSTRAINT beli_batikId_fkey FOREIGN KEY (batikId) REFERENCES batik(id) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE beli ADD CONSTRAINT beli_customerId_fkey FOREIGN KEY (customerId) REFERENCES customer(id) ON DELETE RESTRICT ON UPDATE CASCADE;
