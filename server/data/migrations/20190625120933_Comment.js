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
exports.up = function(knex, Promise) {
  return knex.schema.createTable('comment', comment => {
    comment.increments('id').primary();

    comment.text('comment_post').notNullable();

    comment
      .integer('discussion_id')
      .references('id')
      .inTable('discussion')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    comment
      .integer('comment_id')
      .references('id')
      .inTable('comment')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    comment
      .string('user_id')
      .references('id')
      .inTable('user')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    comment.timestamp('created_at').defaultTo(knex.fn.now());

    comment.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('comment');
};
