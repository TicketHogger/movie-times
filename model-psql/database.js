// const pg = require('pg');
// const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/movietimesdb';

// const client = new pg.Client(connectionString);
// client.connect();
// const query = client.query(
//   'CREATE TABLE IF NOT EXISTS movieTimes(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
// query.on('end', () => { client.end(); });


const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'rao',
  host: 'localhost',
  database: 'movietimesdb',
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.log('error from connection.js line 11>>>', err);
  } else {
    console.log(null, res);
  }
  pool.end();
});

const client = new Client({
  user: 'rao',
  host: 'localhost',
  database: 'movietimesdb',
});
client.connect();

//***** DATABASE METHODS */

// const getAll = (actor, callback) => {

//   const query = {
//     text: 'SELECT * FROM movies WHERE actor = $1',
//     values: [actor],
//   };

//   client.query(query, (error, results) => {
//     if (error) {
//       callback(error);
//     } else {
//       callback(null, results);
//     }
//     // client.end();
//   });
// };

// const addMovie = (title, year, image, actor, callback) => {
//   const query = {
//     text: 'INSERT INTO movies(title, year, image, actor) VALUES($1, $2, $3, $4)',
//     values: [title, year, image, actor],
//   };

//   client.query(query, (error, results) => {
//     if (error) {
//       callback(error);
//     } else {
//       callback(null, results);
//     }
//     // client.end();
//   });

// };
// module.exports = { getAll, addMovie };