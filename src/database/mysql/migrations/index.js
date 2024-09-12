import { mysqlConnection, mysqlConnectionDBMovies } from "../index.js";
import { createDB, createUsers, useDB, insertInitialUsers } from "./createDB.js";

async function migrationsRun() {
  const schemas = [createDB, useDB, createUsers].join("");

  try { // Create database and tables if they don't exist
    const connection = await mysqlConnection();
    console.log('Connected to MySQL');
    
    const result = await connection.query(schemas);
    const tableNotCreated = result[0][2].warningStatus === 1 ? true : false;
    
    console.log('Migrations runned');
  } catch (error) {
    console.log(error);
  }

  try { // Insert initial users if there are no users in the database yet
    const connection = await mysqlConnectionDBMovies();
    const result = await connection.query('SELECT COUNT(*) AS number from users');
    const numberOfUsers = result[0][0].number;
    console.log('Number of users:', numberOfUsers);
    if (numberOfUsers === 0){
      await connection.query(insertInitialUsers);
      console.log('Initial users inserted');
    }
  } catch (error) {
    console.log(error);
  }
}

export { migrationsRun };