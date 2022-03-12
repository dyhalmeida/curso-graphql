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
      return await knex.select('*').from('profiles').where({ id: filter.id }).first()
    } catch (error) {
      throw new Error("Internal server error")  
    }
  }
}