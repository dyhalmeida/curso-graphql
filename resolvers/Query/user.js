const knex = require('../../config/db')

module.exports = {
  users: () => {
    try {
      return knex.select('*').from('users')
    } catch (error) {
      throw new Error("Internal server error")  
    }
  },
  user: (_, { filter }) => {
    try {
      return knex.select('*').from('users').where({ id: filter.id }).first()
    } catch (error) {
      throw new Error("Internal server error")  
    }
  }
}