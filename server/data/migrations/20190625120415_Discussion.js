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
    discussion.increments('id').primary();

    discussion
      .integer('subtopic_id')
      .references('subtopic.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    discussion.string('title', 50).notNullable();

    discussion.text('content');

    discussion.string('image');

    discussion
      .text('creater_id')
      .notNullable()
      .references('users.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    discussion.timestamp(true, true);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('discussion');
};
