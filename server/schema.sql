CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  id int(6) NOT NULL AUTO_INCREMENT,
  message VARCHAR(255) DEFAULT NULL,
  id_rooms int(3) DEFAULT NULL,
  id_users int(5) DEFAULT NULL,
  PRIMARY KEY (id)
);

/* Create other tables and define schemas for them here! */
CREATE TABLE rooms (
  id int(6) NOT NULL AUTO_INCREMENT,
  roomname VARCHAR(50) DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE users (
  id int(6) NOT NULL AUTO_INCREMENT,
  username VARCHAR(50) DEFAULT NULL,
  PRIMARY KEY (id)
);

ALTER TABLE messages ADD FOREIGN KEY (id_rooms) REFERENCES rooms (id);
ALTER TABLE messages ADD FOREIGN KEY (id_users) REFERENCES users (id);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

