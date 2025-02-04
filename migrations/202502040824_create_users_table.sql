DROP TABLE IF EXISTS users;

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