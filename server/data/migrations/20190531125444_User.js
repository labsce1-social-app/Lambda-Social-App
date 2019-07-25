/*
  Used to create a user
  user SCHEMA {
    id: String
    username: String! unique
    email: String
    avatar: String
  }
*/
exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', user => {
    user
      .text('id')
      .primary()
      .notNullable();

    user
      .string('username', 25)
      .notNullable();

    user
      .string('email', 128)
      .unique()
      .notNullable();

    user
      .text('avatar')
      .notNullable();

    // adding just for user profile purposes
    user
      .string('title')

    user
      .timestamps(true, true);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};

// SELECT 'user' WHERE 'id' = 'id' INSERT 'subtopicID'
