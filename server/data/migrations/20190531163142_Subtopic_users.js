/*
  Used to create a subtopic_users table
  This will be used to hold an array of user ids
  and subtopic ids. It will let know which users have joined a
  subtopic as an array.

  subtopic_users SCHEMA {
    id: Int
    user_id: Int! (foreign key to a user id)
    subtopic_id: Int! (foreign key to a subtopic id)
  }
*/

exports.up = function (knex, Promise) {
    return knex.schema.createTable('subtopic_users', subtopic_users => {
        subtopic_users
            .increments('id')
            .primary();

        subtopic_users
            .integer('user_id')
            .references('id')
            .inTable('user')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

        subtopic_users
            .integer('subtopic_id')
            .references('id')
            .inTable('subtopic')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('subtopic_users');
};
