const knex = require('knex');
const knexconfig = require('../knexfile.js');
const enviornment = process.env.NODE_ENV || 'development';

module.exports = knex(knexconfig[enviornment])
