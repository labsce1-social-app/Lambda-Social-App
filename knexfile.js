require('dotenv').config()

// const pg = require('pg');
// pg.defaults.ssl = true;
// const localPgConnection = {
//   host: 'localhost',
//   database: 'dev',
//   user: 'social.app.deploy@gmail.com',
//   password: '$ocialapp123456789'
// };

// const prodDbConnection =
//   process.env.HEROKU_POSTGRESQL_GOLD_URL || localPgConnection;

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'lambdasocial',
      user: 'postgres',
      password: 'lambdasocialiscool'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './server/data/migrations'
    },
    seeds: { directory: './server/data/seeds' },
    useNullAsDefault: true
  },
  production: {
    client: 'sqlite3',
    connection: { filename: './server/data/dev.sqlite3' },
    useNullAsDefault: true,
    migrations: {
      directory: './server/data/migrations',
      tableName: 'knex_migrations'
    },
    seeds: { directory: './server/data/seeds/01_static.js' }
  }
  // production: {
  //   client: 'postgresql',
  //   connection: prodDbConnection,
  //   useNullAsDefault: true,
  //   migrations: {
  //     directory: './server/data/migrations',
  //     tableName: 'knex_migrations'
  //   },
  //   seeds: { directory: './server/data/seeds' }
  // }
};
