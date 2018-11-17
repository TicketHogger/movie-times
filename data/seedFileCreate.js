const faker = require('faker');
const fs = require('fs');

const theater = ['Ocean View', '32 Chambers', 'Fremont Mall', 'Hollywood Dreams', 'Gene GoMovies', 'Bollywood Hangama'];
const date =  ['2018-11-18', '2018-11-19', '2018-11-20', '2018-11-21', '2018-11-22', '2018-11-23', '2018-11-24'];
const times = '{"11:00am":"11:00","5:30pm":"5:30","8:00pm":"8:00","10:30pm":"10:30"}';

var stream = fs.createWriteStream(__dirname + '/seedFileCreate1.csv');
// var str = 'hogehogefugafugafoobarpiyo[';
var i = 0;

stream.on('drain', function() {
  write();
});

write();

function write() {
  
  while (i < 20000000) { // 1Gtimes

    const movieTimes = {};
    i++;
    movieTimes.movie = faker.lorem.words();
    movieTimes.theater = faker.name.findName();
    movieTimes.address = faker.address.streetAddress("###") + ' ' + faker.address.city() + ' ' + faker.address.state() + ' ' + faker.address.countryCode();
    // movieTimes.date = faker.date.recent();
    movieTimes.date = date[Math.floor(Math.random() * 7)];
    movieTimes.latitude = faker.address.latitude();
    movieTimes.longitude = faker.address.longitude();
    movieTimes.times = times;
    movieTimes.movie_id = i;
    if (!stream.write(`${movieTimes.movie}; ${movieTimes.theater}; ${movieTimes.address}; ${movieTimes.date}; ${movieTimes.latitude}; ${movieTimes.longitude}; ${movieTimes.times}; ${movieTimes.movie_id}\n`)) {
      return;
    }
    
  }
  stream.end();
}


//append write code..can run multiple times to append the file....
// const movieDataMaker = (num) => {
//     createData.on('drain', function() {
//           createData();
//     });
//     createData();

// 	var createData = fs.createWriteStream('data/seedFileCreate.csv', {
// 	  flags: 'a' // 'a' means appending (old data will be preserved)
// 	})
//     const movieTimes = {};
// 	for (let i = 1; i <= num; i += 1) {
//     // movieTimes.title = faker.lorem.words();
//     movieTimes.movie = 'palace' + i;
//     movieTimes.theater = faker.name.findName();
//     movieTimes.address = faker.address.streetAddress("###") + ' ' + faker.address.city() + ' ' + faker.address.state() + ' ' + faker.address.countryCode();
//     // movieTimes.date = faker.date.recent();
//     movieTimes.date = date[Math.floor(Math.random() * 7)];
//     movieTimes.latitude = faker.address.latitude();
//     movieTimes.longitude = faker.address.longitude();
//     movieTimes.times = times;
//     movieTimes.movie_id = i;
// 	createData.write(`${movieTimes.movie}, ${movieTimes.theater}, ${movieTimes.address}, ${movieTimes.date}, ${movieTimes.latitude}, ${movieTimes.longitude}, ${movieTimes.times}, ${movieTimes.movie_id}\n`);
// 	}
// } 

// movieDataMaker(10000000);
