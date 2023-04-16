const knex = require('knex')
const configs = require('../knexfile')
// eslint-disable-next-line no-undef
const environment = process.env.NODE_ENV || 'development'

module.exports = knex(configs[environment])