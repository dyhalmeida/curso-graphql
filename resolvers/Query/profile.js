const knex = require('../../config/db')

module.exports = {
  profiles: async () => {
    try {
      return await knex.select('*').from('profiles')
    } catch (error) {
      throw new Error("Internal server error")  
    }
  },
  profile: async (_, { filters }) => {
    try {
      if (!filters) return null
      if (filters.id) {
        return knex.select('*').from('profiles').where({ id: filters.id }).first()
      }
      if (filters.name) {
        return knex.select('*').from('profiles').where({ name: filters.name }).first()
      }
      return null
    } catch (error) {
      throw new Error("Internal server error")  
    }
  }
}