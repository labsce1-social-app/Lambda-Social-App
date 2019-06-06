const knex = require('knex');
const knexconfig = require('../../knexfile.js');

let env = process.env.NODE_ENV || 'development';
env = env === 'test' ? 'development' : env;

module.exports = knex(knexconfig[env]);
