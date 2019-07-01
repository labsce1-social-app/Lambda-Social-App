// const { genUsers } = require('../utils');
const users = require('../utils/json/users.json');
exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('users').insert(users);
    });
};
