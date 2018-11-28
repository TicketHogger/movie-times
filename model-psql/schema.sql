CREATE DATABASE IF NOT EXISTS movietimesdb;

\connect movietimesdb;

CREATE TABLE MovieTimes (
    id SERIAL NOT NULL PRIMARY KEY,
    movie VARCHAR(100),
    theater VARCHAR(100),
    Address VARCHAR(300),
    Date DATE,
    latitude DECIMAL(20, 2) DEFAULT NULL,
    longitude DECIMAL(20, 2) DEFAULT NULL,
    times VARCHAR(300),
    movie_id INT
);
