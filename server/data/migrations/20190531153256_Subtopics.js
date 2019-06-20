/*
  Used to create a subtopic
  subtopic SCHEMA {
    id: Int
    title: String! unique
    creater_id: Int! (foreign key to a user for ownership)
  }
*/
exports.up = function(knex, Promise) {
  return knex.schema.createTable('subtopic', subtopic => {
    subtopic.increments('id').primary();

    subtopic
      .string('title', 50)
      .unique()
      .notNullable();

    subtopic.timestamp('created_at').defaultTo(knex.fn.now());

    subtopic.timestamp('updated_at').defaultTo(knex.fn.now());

    subtopic
      .integer('creater_id')
      .references('user_id')
      .inTable('user')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('subtopic');
};
