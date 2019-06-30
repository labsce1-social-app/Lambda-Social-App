/*
  Used to create an upvote
  this will be used to house an array of users that have voted on a particular discussion.

  upvote SCHEMA {
    id: Int
    discussion_id: Int! (foreign key to a discussion id)
    user_id: Int! (foreign key to a user id)
  }
*/
exports.up = function (knex, Promise) {
  return knex.schema.createTable('upvote', upvote => {
    upvote.increments('id').primary();

    upvote
      .integer('discussion_id')
      .references('id')
      .inTable('discussion')
      .notNullable()
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    upvote
      .string('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('upvote');
};
