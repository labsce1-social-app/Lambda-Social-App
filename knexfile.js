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

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    useNullAsDefault: true,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
