const express = require('express')
const path = require('path')
const mysql = require('mysql')
const morgan = require('morgan')
const parser = require('body-parser')

const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'MovieTimes',
});

connection.connect();

app.use(parser.json());
app.use(express.static(path.join(__dirname +'./../public')));
app.use(morgan("default"));

// not rendered
app.get('/api/movies/:movie/:date/:location', (req, res) => {
  let querystring = 'SELECT * FROM MovieTimes WHERE movie = (?) AND date = (?)';
  connection.query(querystring, [req.params.movie, req.params.date], (error, result) => {
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
    res.send(newResult);
  });

});

app.get('/api/moviesbyid/:movieid/:date/:location', (req, res) => {
  const querystring = 'SELECT * FROM MovieTimes WHERE movie_id = (?) AND date = (?)';
  connection.query(querystring, [req.params.movieid, req.params.date], (error, result) => {
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
    res.send(newResult);
  });
});

//ReadOne record
app.get('/api/moviesbyid/:movieid', (req, res) => {
  const querystring = 'SELECT * FROM MovieTimes WHERE id = (?)';
  connection.query(querystring, [req.params.movieid], (error, result) => {
    if (error) {
      res.send(error);
    }
    res.send();
  });
});

app.put('/api/moviesbyid/:movieid', function(request, response) {
  // access the body of the request to get the vote name
  // query the database with an update
  const querystring = 'UPDATE MovieTimes SET movie = movie, theater = theater, Address = Address, latitude = latitude, longitude = longitude, times = times  WHERE id = ?';
  connection.query(querystring, [request.body.movieid], function(error) {
    if(error) {
      response.status(500).send(error.message);
    } else {
      // end the response
      response.end();
    }
  });
});


app.post('/api/moviesbyid', function(request, response) {
  connection.query(`INSERT into MovieTimes (movie, theater, Address, Date, latitude, longitude, times) VALUES (?, ?, ?, ?, ?, ?, ?)`, [request.body.movie, request.body.theater, request.body.Address, request.body.Date, request.body.latititude, request.body.longitude, request.body.times], function(error) {
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
  const querystring = 'DELETE from MovieTimes WHERE id = ?';
  connection.query(querystring, [request.body.movieid], function(error) {
    if(error) {
      response.status(500).send(error.message);
    } else {
      // end the response
      response.end();
    }
  });
});

const port = '3002';

let server = app.listen(port, console.log(`listening on port: ${port}`));

// necessary function for tests to close server
function stop(exec) {
  server.close(exec());
}

module.exports = app;
module.exports.stop = stop;