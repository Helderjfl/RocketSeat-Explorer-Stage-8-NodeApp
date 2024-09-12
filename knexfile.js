// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export const development = {
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'teste',
    database: 'movies'
  },
  migrations: {
    directory: './src/database/knex/migrations'
  },
  useNullAsDefault: true
};
