/*
  Used to create an hashtag
  this will be used to house an array of users that have voted on a particular discussion.

  hashtag SCHEMA {
    id: Int
    discussion_id: Int! (foreign key to a discussion id)
    user_id: Int! (foreign key to a user id)
  }
*/
exports.up = function (knex, Promise) {
  return knex.schema.createTable('hashtag', hashtag => {
    hashtag.increments('id').primary();

    hashtag
      .string('hashtag', 20);

    hashtag
      .integer('discussion_id')
      .notNullable()
      .references('discussion.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    hashtag.timestamp(true, true);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('hashtag');
};
