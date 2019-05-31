exports.up = function(knex, Promise) {
  return knex.schema.createTable('upvote', upvote => {
    upvote.increments('id');

    upvote
      .integer('discussion_id')
      .references('id')
      .inTable('discussion')
      .notNullable()
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    upvote
      .integer('user_id')
      .references('id')
      .inTable('user')
      .notNullable()
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('upvote');
};
