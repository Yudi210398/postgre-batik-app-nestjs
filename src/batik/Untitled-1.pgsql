SELECT * from customer;
SELECT * from batik;
SELECT * FROM pembelian;
SELECT * from admins;




INSERT INTO batik ("typeBatik", "stockBatikAwal", "jenisBatik")
VALUES  ('PA', 50, 'Sutra') , 
        ('NA', 47, 'Sutra'),
        ('NK', 90, 'Katun'),
        ('IB', 21, 'Katun'), 
        ('A+', 28, 'Katun');

 
        INSERT INTO batik ("typeBatik", "stockBatikAwal", "jenisBatik")
VALUES   ('MD', 30, 'Katun');



DELETE from batik WHERE "id" = 16;

INSERT into customer("namaCustomer") 
VALUES ('Hana Safira'),
        ('Sasa'),
         ('Enrico'),
          ('Imam');

INSERT into pembelian ("batikId", "quantity", "customerId")
        VALUES (2, 2, 1);


SELECT customer."namaCustomer", batik."typeBatik", quantity, batik."stockBatikAwal" from pembelian JOIN customer on customer.id = pembelian."customerId"
JOIN batik on batik."id" = pembelian."batikId"; 