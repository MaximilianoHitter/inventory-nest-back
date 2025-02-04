DROP TABLE IF EXISTS products;

CREATE TABLE products(  
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    nombre varchar(255) COMMENT 'Nombre',
    descripcion varchar(255) COMMENT 'Descripcion',
    precio decimal(10,2) COMMENT 'Precio',
    updated_at DATETIME COMMENT 'Update Time',
    created_at DATETIME COMMENT 'Create Time'
) COMMENT 'products_table';