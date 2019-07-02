/*
  Used to create a subtopic
  subtopic SCHEMA {
    id: Int
    title: String! unique
    creater_id: Int! (foreign key to a user for ownership)
  }
*/
exports.up = function (knex, Promise) {
  return knex.schema.createTable('subtopic', subtopic => {
    subtopic
      .increments()
      .index()

    subtopic
      .string('title', 50)
      .unique()
      .notNullable();

    subtopic
      .timestamps(true, true);


    subtopic
      .text('creater_id')
      .references('users.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('subtopic');
};
