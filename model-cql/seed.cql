USE movietimes_ks;                

DROP movietimes1;

CREATE TABLE IF NOT EXISTS movietimes1 (
    id int,
    movie text, 
    theater text,
    Address text,
    Date text, 
    latitude decimal,
    longitude decimal,
    times text,
    movie_id int,
    PRIMARY KEY (id)
);

COPY movietimes1(id, movie, theater, address, date, latitude, longitude, times, movie_id) FROM '/Users/rao/documents/hr105/tickethogger/movie-times/data/seedFileCreate2.csv' WITH HEADER = FALSE AND DELIMITER=';';