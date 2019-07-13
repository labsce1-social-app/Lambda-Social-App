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

    // creating a unique constraint accross discusion id and user id
    // this will make it so that there can only be one row
    // in this table with these two values
    // this is used to determine if a user should be added into the list
    // of id's or just have their votes updated
    // see /api/helpers/upvoteHelpers for more details
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
