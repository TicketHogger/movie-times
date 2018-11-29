const express = require('express')
const path = require('path')
const mysql = require('mysql')
const morgan = require('morgan')
const parser = require('body-parser')
const app = express();
// const pg = require('pg');
const db = require('../model-psql/database.js');
require('newrelic');

const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'password',
  host: '54.185.18.177',
  port:'5432',
  database: 'movietimesdb',
});
// const pool = new Pool({
//   user: 'rao',
//   host: 'localhost',
//   database: 'movietimesdb',
// });
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.log('error from server.js line 21>>>', err);
  } else {
    console.log(null, res);
  }
  pool.end();
});

const client = new Client({
  user: 'postgres',
  host: '54.185.18.177',
  port:'5432',
  password: 'password',
  database: 'movietimesdb',
});
client.connect();

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   database: 'MovieTimes',
// });

// connection.connect();

app.use(parser.json());
app.use(express.static(path.join(__dirname +'./../public')));
app.use(morgan("default"));

app.get('/loaderio-8e54bc886c23a09d4db9d2070321dcda', (req, res) => {
  if (error) {
    res.send(error);
  }
  res.send('loaderio-8e54bc886c23a09d4db9d2070321dcda');
})

app.get('/api/movies/:movieid/:date/:location', (req, res) => {
  console.log(client);
  let querystring = `SELECT * FROM movietimes WHERE movie_id = ${req.params.movieid} AND date = '${req.params.date}'`;
  client.query(querystring, (error, result) => {
    if (error) {
      res.send(error);
    }
    const newResult = []
    const coords = req.params.location.split(',')
    const lat = coords[0]
    const long = coords[1]

    for (var i = 0; i < result.length; i++) {
      if (Math.abs(lat-result[i].latitude) < 75 && Math.abs(long-result[i].longitude) < 75) {
        newResult.push(result[i]);
      }
    }
    res.send(result);
    // res.send(newResult);
  });
});

//postgres
app.get('/api/moviesbyid/:movieid/:date/:location', (req, res) => {
  console.log(req.params.movieid);
  date_req = '' + req.params.date;
  const querystring = `SELECT * FROM movietimes WHERE movie_id = ${req.params.movieid} AND date = '${req.params.date}' ORDER BY theater DESC LIMIT 20`;
  client.query(querystring, (error, result) => {
    // console.log(result);
    if (error) {
      res.send(error);
    }
    const newResult = [];
    const coords = req.params.location.split(',');
    const lat = coords[0];
    const long = coords[1];

    for (var i = 0; i < result.length; i++) {
      if (Math.abs(lat - result[i].latitude) < 75 && Math.abs(long - result[i].longitude) < 75) {
        newResult.push(result[i]);
      }
    }
    console.log(result);
    // res.send(newResult);
    res.send(result);
  });
});

// ReadOne record
app.get('/api/moviesbyid/:movieid', (req, res) => {
  const querystring = `SELECT * FROM movietimes WHERE movie_id = ${req.params.movieid}`;
  client.query(querystring, (error, result) => {
    console.log(result);
    if (error) {
      res.send(error);
    }
    res.send();
  });
});

app.put('/api/moviesbyid/:movieid', function(request, response) {
  // access the body of the request to get the vote name
  // query the database with an update
  const querystring = `UPDATE movietimes SET movie = movie, theater = theater, Address = Address, latitude = latitude, longitude = longitude, times = times  WHERE id = ?`;
  client.query(querystring, [request.body.movieid], function(error) {
    if(error) {
      response.status(500).send(error.message);
    } else {
      // end the response
      response.end();
    }
  });
});


app.post('/api/moviesbyid', function(request, response) {
  client.query(`INSERT into movietimes (movie, theater, Address, Date, latitude, longitude, times) VALUES (?, ?, ?, ?, ?, ?, ?)`, [request.body.movie, request.body.theater, request.body.Address, request.body.Date, request.body.latititude, request.body.longitude, request.body.times], function(error) {
    if(error) {
      response.status(500).send(error.message);
    } else {
      // end the response
      response.end();
    }
  });
});


app.delete('/api/moviesbyid/:movieid', function(request, response) {
  // access the body of the request to get the vote name
  // query the database with an update
  const querystring = `DELETE from movietimes WHERE id = ?`;
  client.query(querystring, [request.body.movieid], function(error) {
    if(error) {
      response.status(500).send(error.message);
    } else {
      // end the response
      response.end();
    }
  });
});

// not rendered
// app.get('/api/movies/:movie/:date/:location', (req, res) => {
//   let querystring = 'SELECT * FROM MovieTimes WHERE movie = (?) AND date = (?)';
//   db.query(querystring, [req.params.movie, req.params.date], (error, result) => {
//     if (error) {
//       res.send(error);
//     }
//     const newResult = []
//     const coords = req.params.location.split(',')
//     const lat = coords[0]
//     const long = coords[1]

//     for (var i = 0; i < result.length; i++) {
//       if (Math.abs(lat-result[i].latitude) < 75 && Math.abs(long-result[i].longitude) < 75) {
//         newResult.push(result[i]);
//       }
//     }
//     res.send(newResult);
//   });

// });

// app.get('/api/moviesbyid/:movieid/:date/:location', (req, res) => {
//   const querystring = 'SELECT * FROM MovieTimes WHERE movie_id = (?) AND date = (?)';
//   connection.query(querystring, [req.params.movieid, req.params.date], (error, result) => {
//     if (error) {
//       res.send(error);
//     }
//     const newResult = [];
//     const coords = req.params.location.split(',');
//     const lat = coords[0];
//     const long = coords[1];

//     for (var i = 0; i < result.length; i++) {
//       if (Math.abs(lat - result[i].latitude) < 75 && Math.abs(long - result[i].longitude) < 75) {
//         newResult.push(result[i]);
//       }
//     }
//     res.send(newResult);
//   });
// });

//ReadOne record
// app.get('/api/moviesbyid/:movieid', (req, res) => {
//   const querystring = 'SELECT * FROM MovieTimes WHERE id = (?)';
//   connection.query(querystring, [req.params.movieid], (error, result) => {
//     if (error) {
//       res.send(error);
//     }
//     res.send();
//   });
// });

// app.put('/api/moviesbyid/:movieid', function(request, response) {
//   // access the body of the request to get the vote name
//   // query the database with an update
//   const querystring = 'UPDATE MovieTimes SET movie = movie, theater = theater, Address = Address, latitude = latitude, longitude = longitude, times = times  WHERE id = ?';
//   connection.query(querystring, [request.body.movieid], function(error) {
//     if(error) {
//       response.status(500).send(error.message);
//     } else {
//       // end the response
//       response.end();
//     }
//   });
// });


// app.post('/api/moviesbyid', function(request, response) {
//   connection.query(`INSERT into MovieTimes (movie, theater, Address, Date, latitude, longitude, times) VALUES (?, ?, ?, ?, ?, ?, ?)`, [request.body.movie, request.body.theater, request.body.Address, request.body.Date, request.body.latititude, request.body.longitude, request.body.times], function(error) {
//     if(error) {
//       response.status(500).send(error.message);
//     } else {
//       // end the response
//       response.end();
//     }
//   });
// });


// app.delete('/api/moviesbyid/:movieid', function(request, response) {
//   // access the body of the request to get the vote name
//   // query the database with an update
//   const querystring = 'DELETE from MovieTimes WHERE id = ?';
//   connection.query(querystring, [request.body.movieid], function(error) {
//     if(error) {
//       response.status(500).send(error.message);
//     } else {
//       // end the response
//       response.end();
//     }
//   });
// });

const port = '3002';

let server = app.listen(port, console.log(`listening on port: ${port}`));

// necessary function for tests to close server
function stop(exec) {
  server.close(exec());
}

module.exports = app;
module.exports.stop = stop;