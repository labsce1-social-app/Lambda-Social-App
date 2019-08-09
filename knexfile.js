require('dotenv').config()

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'lambdasocial',
      user: 'postgres',
      password: process.env.DB_PASSWORD
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './server/data/migrations'
    },
    seeds: { directory: './server/data/seeds' }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    // ssl: true,
    migrations: {
      directory: './server/data/migrations',
      tableName: 'knex_migrations'
    },
    seeds: { directory: './server/data/seeds' }
  }
};
