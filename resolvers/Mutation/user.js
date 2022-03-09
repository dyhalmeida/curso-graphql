const knex = require('../../config/db')

module.exports = {
  createUser: async (_, { data }) => {
    try {
      const [id] = await knex.insert(data).into('users')
      const user = await knex.select('*').from('users').where({ id }).first()
      return user
    } catch (error) {
      if (error.sqlMessage) {
        throw new Error(error.sqlMessage)
      }
      throw new Error('Internal server error')
    } 
  },
  deleteUser: async (_, { filters }) => {
    try {
      const userFound = await knex.select('*').from('users').where({ id: filters.id }).first()
      if (!userFound) throw new Error('User not found')
      await knex.delete().from('users').where({ id: filters.id })
      return userFound
    } catch (error) {
      if (error.sqlMessage || error.message) {
        throw new Error(error.sqlMessage || error.message)
      }
      throw new Error('Internal server error')
    } 
  },
  updateUser: async (_, { filters, data }) => {
    await knex('users').update({ ...data }).where({ id: filters.id })
    const user = await knex.select('*').from('users').where({ id: filters.id }).first()
    return user
  }
}