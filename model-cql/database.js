const cassandra = require('cassandra-driver');


const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: 'movietimes_ks' });

client.connect( (err) => {
  if (err) return console.error(err);
  console.log('Connected to cluster with %d host(s): %j', client.hosts.length, client.hosts.keys());

  const createTable = `                  
  CREATE TABLE movieTimes(
    id timeuuid PRIMARY KEY,
    movie text, 
    theater text,
    Address text,
    Date date, 
    latitude decimal,
    longitude decimal,
    times text,
    movie_id int,
    )`;

  const query = `COPY movieTimes ("movie", "theater", "address", "date", "latitude", "longitude", "times", "movie_id")  FROM '/Users/rao/documents/hr105/tickethogger/movie-times/data/seedFileCreate1.csv' WITH HEADER = FALSE AND DELIMITER=';' ;`;

  client.execute(query)
    .then((err, results) => {
      if (err) return console.error(err);
      console.log(results);
    });
});