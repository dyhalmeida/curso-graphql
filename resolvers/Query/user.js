const knex = require('../../config/db')

module.exports = {
  users: () => {
    try {
      return knex.select('*').from('users')
    } catch (error) {
      throw new Error("Internal server error")  
    }
  },
  user: (_, { filters }) => {
    try {
      if (!filters) return null
      if (filters.id) {
        return knex.select('*').from('users').where({ id: filters.id }).first()
      }
      if (filters.email) {
        return knex.select('*').from('users').where({ email: filters.email }).first()
      }
      return null
    } catch (error) {
      throw new Error("Internal server error")  
    }
  }
}