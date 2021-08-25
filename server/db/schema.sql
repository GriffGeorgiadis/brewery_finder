DROP DATABASE breweryFinder;
CREATE DATABASE breweryFinder;

CREATE TABLE breweries (
  id serial NOT NULL,
  name varchar(60),
  address varchar(255),
  rating INT
);