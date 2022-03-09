const knex = require('../../config/db')

module.exports = {
  users: async () => {
    try {
      const users = await knex.select('*').from('users')
        .then(users => users.map(user => ({...user})))
      return users
    } catch (error) {
      throw new Error("Internal server error")  
    }
  },
  user: async (_, { filter }) => {
    try {
      const user = await knex.select('*').from('users').where({ id: filter.id }).first()
      return user
    } catch (error) {
      throw new Error("Internal server error")  
    }
  }
}