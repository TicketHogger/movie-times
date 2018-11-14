# Project Name

> Calendar, Modal & Theater listing for Moovi's Theatre View component.

# Team Name
> TicketHogger

## Name
> Rao Guttula

## Related Projects

  - https://github.com/Team-DAD/movie-summary
  - https://github.com/Team-DAD/movie-dada
  - https://github.com/Team-DAD/movie-reviews

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

![Component Rendered](image.png "Component")

### SDC updates from Rao Guttula

## Operationalize app 

- Use below command if you have password for mysql:
	- mysql -u <password> -p

 	otherwise use following:
 	- mysql -u root to start mysql commands 

- create database and seed: (seed data is in schema.sql itself)
  mysql -u root < schema.sql
- npm run watch
- npm run

# CRUD Server Side Documentation


|Action | Request| Route | Purpose|
|-------|--------|-------|--------|
|Create |  Post  | /api/moviesbyid/:movieid | Insert new movie record|
|ReadAll|  GET   | /api/moviesbyid | Get all movies|
|Update | PUT    | /api/moviesbyid/:movieid | Update movietimes with new movie|
|Delete | DELETE | //api/moviesbyid/:movieid | Delete movie from movietimes|

## GET/READALL REQUESTS:
- req.body requirements: [None]
- Response: movie data

## CREATE/POST REQUESTS:
- req.body requirements: [movie, theater, address, date, latitude, longitude, times]
- Response: [None]

## UPDATE/PATCH REQUESTS:
- req.body requirements: [id, movie, theater, address]
- Response: [None]

## DELETE REQUESTS:
- req.body requirements: [id]
- Response: [None]