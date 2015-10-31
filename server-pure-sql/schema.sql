-- CREATE DATABASE chat;

-- USE chat;

-- CREATE TABLE messages (
--   objectId int(6) NOT NULL AUTO_INCREMENT,
--   text VARCHAR(255) DEFAULT NULL,
--   createdAt VARCHAR(255) DEFAULT NULL,
--   roomname VARCHAR(255) DEFAULT NULL,
--   id_users int(5) DEFAULT NULL,
--   PRIMARY KEY (objectId)
-- );

-- /* Create other tables and define schemas for them here! */
-- -- CREATE TABLE rooms (
-- --   id int(6) NOT NULL AUTO_INCREMENT,
-- --   roomname VARCHAR(50) DEFAULT NULL,
-- --   PRIMARY KEY (id)
-- -- );

-- CREATE TABLE users (
--   id int(6) NOT NULL AUTO_INCREMENT,
--   username VARCHAR(50) DEFAULT NULL,
--   PRIMARY KEY (id)
-- );


-- ALTER TABLE messages ADD FOREIGN KEY (id_users) REFERENCES users (id);

-- /*  Execute this file from the command line by typing:
--  *    mysql -u root -p < server/schema.sql
--  *  to create the database and the tables.*/

