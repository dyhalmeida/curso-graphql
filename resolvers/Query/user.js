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
      if (!filter) return null
      if (filter.id) {
        return knex.select('*').from('users').where({ id: filter.id }).first()
      }
      if (filter.email) {
        return knex.select('*').from('users').where({ email: filter.email }).first()
      }
      return null
    } catch (error) {
      throw new Error("Internal server error")  
    }
  }
}