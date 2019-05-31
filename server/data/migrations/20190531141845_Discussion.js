exports.up = function(knex, Promise) {
  return knex.schema.createTable('discussion', discussion => {
    discussion.increments('id');

    discussion
      .integer('subtopic_id')
      .references('id')
      .inTable('subtopic')
      .notNullable()
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    discussion.string('title', 50).notNullable();

    discussion.string('image');

    discussion.timestamp('created_at').defaultTo(knex.fn.now());

    discussion.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('discussion');
};
