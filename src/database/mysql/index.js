import mysql from 'mysql2/promise';

async function mysqlConnection() {
  return await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'teste',
    port: 3306,
    multipleStatements: true
  });
}

async function mysqlConnectionDBMovies() {
  return await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'teste',
    database: 'movies',
    port: 3306
  })
}

export { mysqlConnection, mysqlConnectionDBMovies };