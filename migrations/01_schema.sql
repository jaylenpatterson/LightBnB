-- DROP TABLE IF EXISTS users CASCADE;
-- DROP TABLE IF EXISTS properties CASCADE;
-- DROP TABLE IF EXISTS reservations CASCADE;
-- DROP TABLE IF EXISTS property_reviews CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

INSERT INTO users (name, email, password)
VALUES ('jaylen', 'jaylenpatterson16@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('jacob', 'jacobBOOL@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('salim', 'salimSm@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');



CREATE TABLE properties (
  id SERIAL PRIMARY KEY NOT NULL,
  owner_id INTEGER,
  
  title VARCHAR(255),
  description TEXT,
  thumbnail_photo_url VARCHAR(255),
  cover_photo_url VARCHAR(255),
  cost_per_night INTEGER,
  parking_spaces INTEGER,
  number_of_bathrooms INTEGER,
  number_of_bedrooms INTEGER,

  country VARCHAR(255),
  street VARCHAR(255),
  city VARCHAR(255),
  province VARCHAR(255),
  post_code VARCHAR(255),

  active BOOLEAN
);

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (777,'Tiny Tinas Villa','message','www.picture.com','www.picture.com', 300, 2, 3, 2, 'Canada', 'cana Street', 'Toronto', 'Ontario', 'L2G', 'true'),
(888,'Simbas Cove','message','www.picture.com','www.picture.com', 240, 1, 2, 7, 'USA', 'PATTERSON AVE', 'New York', 'New York', 'G9J', 'false'),
(999, 'Sabrinas Tower','message','www.picture.com','www.picture.com', 2000, 4, 7, 10, 'Canada', 'Queen Street', 'Toronto', 'Ontario', 'K9C', 'true');



CREATE TABLE reservations (
  id SERIAL PRIMARY KEY NOT NULL,
  start_date DATE,
  end_date DATE,
  property_id INTEGER,
  guest_id INTEGER
);

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2021,01,26', '2021,01,28', 1, 512),
('2021,03,22', '2021,03,24', 3, 123),
('2022,07,7', '2022,07,10', 1, 145);



CREATE TABLE property_reviews (
  id SERIAL PRIMARY KEY NOT NULL,
  guest_id INTEGER,
  property_id INTEGER,
  reservation_id INTEGER,
  rating SMALLINT,
  message TEXT
);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (512, 1, 566, 5, 'message'),
(123, 3, 899, 3, 'message'),
(145, 1, 910, 4, 'message');