\COPY movieTimes("movie", "theater", "address", "date", "latitude", "longitude", "times", "movie_id") FROM '/Users/rao/documents/hr105/tickethogger/movie-times/data/seedFileCreate2.csv' DELIMITER ';' CSV;