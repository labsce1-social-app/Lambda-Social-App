require('dotenv').config();

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './server/data/dev.sqlite3'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './server/data/migrations'
    },
    seeds: {
      directory: './server/data/seeds'
    },
    useNullAsDefault: true
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    ssl: true,
    migrations: {
      tableName: 'knex_migrations',
      directory: './server/data/migrations'
    },
    seeds: {
      directory: './server/data/seeds'
    }
  }
};
