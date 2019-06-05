/*
  Used to create a discussion
  discussion SCHEMA {
    id: Int
    subtopic_id: Int! (foreign key to a subtopic)
    title: String!
    image: String?
    created_at: String
    updated_at: String
  }
*/
exports.up = function (knex, Promise) {
  return knex.schema.createTable('discussion', discussion => {
    discussion
      .increments('id')
      .primary();

    discussion
      .integer('subtopic_id')
      .references('id')
      .inTable('subtopic')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    discussion
      .string('title', 50)
      .notNullable();

    discussion
      .string('image');

    discussion
      .timestamp('created_at')
      .defaultTo(knex.fn.now());

    discussion
      .timestamp('updated_at')
      .defaultTo(knex.fn.now());
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('discussion');
};
