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
  return knex.schema.createTable('user', user => {
    user
      .string('id') // user_id from auth0 sub
      .notNullable()
      .primary();

    user
      .string('username', 25) // username, limited up to 25 characters
      .unique()
      .notNullable();

    user
      .string('email', 128) // email
      .unique()
      .notNullable();

    user
      .string('avatar') // avatar
      .notNullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('user');
};

// SELECT 'user' WHERE 'id' = 'id' INSERT 'subtopicID'
