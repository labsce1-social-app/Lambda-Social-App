
/*
  Used to create a user
  user SCHEMA {
    id: Int
    username: String! unique
  }
*/
exports.up = function (knex, Promise) {
  return knex.schema.createTable('user', user => {
    user
      .increments('id')
      .primary();

    user
      .string('username', 25)
      .unique()
      .notNullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('user');
};

// SELECT 'user' WHERE 'id' = 'id' INSERT 'subtopicID'
