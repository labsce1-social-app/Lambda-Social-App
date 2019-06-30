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
      .string('id', 80) // user_id from auth0 sub
      .primary()
      .unique()
    // .notNullable();

    user
      .string('username', 25) // username, limited up to 25 characters
      .unique()
      .notNullable();

    user
      .string('email', 128) // email
      .unique()
      .notNullable();

    user
      .string('avatar', 100) // avatar
      .notNullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};

// SELECT 'user' WHERE 'id' = 'id' INSERT 'subtopicID'
