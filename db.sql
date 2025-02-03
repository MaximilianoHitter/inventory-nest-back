CREATE TABLE products(  
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    nombre varchar(255) COMMENT 'Nombre',
    descripcion varchar(255) COMMENT 'Descripcion',
    precio decimal(10,2) COMMENT 'Precio',
    updated_at DATETIME COMMENT 'Update Time',
    created_at DATETIME COMMENT 'Create Time'
) COMMENT 'products_table';

CREATE TABLE users(  
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    firstName varchar(255) COMMENT 'First Name',
    lastName varchar(255) COMMENT 'Last Name',
    isActive boolean COMMENT 'Is Active',
    email varchar(255) COMMENT 'Email',
    password varchar(255) COMMENT 'Password',
    updated_at DATETIME COMMENT 'Update Time',
    created_at DATETIME COMMENT 'Create Time'
) COMMENT 'users_table';