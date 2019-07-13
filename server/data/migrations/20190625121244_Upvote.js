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
      .notNullable()
      .references('discussion.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    upvote
      .text('user_id')
      .notNullable()
      .references('users.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')

    upvote
      .unique(['discussion_id', 'user_id'])
    // vote: int
    // can go +1 or -1 values
    upvote
      .integer('vote')
      .notNullable()
      .defaultTo(0)

    upvote.timestamps(true, true);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('upvote');
};
