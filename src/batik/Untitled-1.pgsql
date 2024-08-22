SELECT * from customer;
SELECT * from batik;
SELECT * FROM pembelian;




INSERT INTO batik ("typeBatik", "totalBatik", "jenisBatik")
VALUES  ('PA', 50, 'Katun'),
        ('NA', 47, 'Sutra'),
        ('NK', 90, 'Katun'),
        ('IB', 21, 'Katun'),
        ('A+', 28, 'Katun');



INSERT into customer("namaCustomer") 
VALUES ('Hana Safira'),
        ('Sasa'),
         ('Enrico'),
          ('Imam');

INSERT into pembelian ("batikId", "quantity", "customerId")
        VALUES (2, 2, 1);


SELECT customer."namaCustomer", batik."typeBatik", quantity, batik."totalBatik" from pembelian JOIN customer on customer.id = pembelian."customerId"
JOIN batik on batik."id" = pembelian."batikId"; 