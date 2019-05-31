exports.up = function(knex, Promise) {
  return knex.schema.createTable('comment', comment => {
    comment.increments('id');

    comment.text('comment_post');

    comment
      .integer('comment_id')
      .references('id')
      .inTable('comment')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    comment.timestamp('created_at').defaultTo(knex.fn.now());

    comment.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('comment');
};
