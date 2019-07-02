require('dotenv').config();
const dbEngine = process.env.DB_ENV || 'development';
const config = require('../../knexfile.js')[dbEngine];
module.exports = require('knex')(config);