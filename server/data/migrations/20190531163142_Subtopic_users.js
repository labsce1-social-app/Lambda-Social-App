exports.up = function(knex, Promise) {
  return knex.schema.createTable('subtopic_users', subtopic_users => {
    subtopic_users.increments('id');

    subtopic_users
      .integer('user_id')
      .references('id')
      .inTable('user')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    subtopic_users
      .integer('subtopic_id')
      .references('id')
      .inTable('subtopic')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('subtopic_users');
};
