SELECT * from customer;
SELECT * from batik;
SELECT * FROM pembelian;




INSERT INTO batik ("typeBatik", "totalBatik")
VALUES  ('SL', 20),
        ('PA', 30);


INSERT into customer("namaCustomer")
VALUES ('Hana Safira'),
        ('Sasa');


SELECT customer."namaCustomer", batik."typeBatik", quantity, batik."totalBatik" from pembelian JOIN customer on customer.id = pembelian."customerId"
JOIN batik on batik."id" = pembelian."batikId";