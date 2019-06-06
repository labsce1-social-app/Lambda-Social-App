require('dotenv').config()
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

  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user: 'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './server/data/migrations'
    },
    seeds: {
      directory: './server/data/seeds'
    }
  }
};
