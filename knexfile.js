const localPgConnection = {
  host: 'localhost',
  database: 'dev',
  user: 'social.app.deploy@gmail.com',
  password: '$ocialapp123456789'
};

const prodDbConnection =
  process.env.HEROKU_POSTGRESQL_GOLD_URL || localPgConnection;

module.exports = {
  development: {
    client: 'sqlite3',
    connection: { filename: './server/data/dev.sqlite3' },
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
    seeds: { directory: './server/data/seeds' }
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
