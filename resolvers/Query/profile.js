const knex = require('../../config/db')

module.exports = {
  profiles: async () => {
    try {
      return await knex.select('*').from('profiles')
    } catch (error) {
      throw new Error("Internal server error")  
    }
  },
  profile: async (_, { filter }) => {
    try {
      if (!filter) return null
      if (filter.id) {
        return knex.select('*').from('profiles').where({ id: filter.id }).first()
      }
      if (filter.name) {
        return knex.select('*').from('profiles').where({ name: filter.name }).first()
      }
      return null
    } catch (error) {
      throw new Error("Internal server error")  
    }
  }
}