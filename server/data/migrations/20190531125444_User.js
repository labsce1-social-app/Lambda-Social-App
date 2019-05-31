
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', user => {
      user
      .increments('id');
      user
      .string('username', 25)
      .unique()
      .notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('user');
};
