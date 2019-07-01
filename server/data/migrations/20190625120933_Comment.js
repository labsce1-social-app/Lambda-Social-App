/*
  Used to create a discussion
  comment SCHEMA {
    id: Int
    title: String!
    comment_id: Int! (foreign key to a comment for replies)
    created_at: String
    updated_at: String
  }
*/
exports.up = function (knex, Promise) {
  return knex.schema.createTable('comment', comment => {
    comment.increments('id').primary();

    comment.text('comment_post').notNullable();

    comment
      .integer('discussion_id')
      .references('discussion.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    comment
      .integer('comment_id')
      .references('comment.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    comment
      .text('user_id')
      .notNullable()
      .references('users.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    comment.timestamp(true, true);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('comment');
};
