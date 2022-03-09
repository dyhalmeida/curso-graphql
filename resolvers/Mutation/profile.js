const knex = require('../../config/db')

module.exports = {
  createProfile: async (_, { data }) => {
    try {
      const [id] = await knex.insert(data).into('profiles')
      const profile = await knex.select('*').from('profiles').where({ id }).first()
      return profile
    } catch (error) {
      throw new Error(error.sqlMessage)
    }
  },
  deleteProfile: async (_, { filters }) => {
    try {
      const profileFound = await knex.select('*').from('profiles').where({ id: filters.id }).first()
      if (!profileFound) throw new Error('Profile not found')
      await knex.delete().from('profiles').where({ id: filters.id })
      return profileFound
    } catch (error) {
      if (error.sqlMessage || error.message) {
        throw new Error(error.sqlMessage || error.message)
      }
      throw new Error('Internal server error')
    } 
  },
  updateProfile: async (_, { filters, data }) => {
    await knex('profiles').update({ ...data }).where({ id: filters.id })
    const profile = await knex.select('*').from('profiles').where({ id: filters.id }).first()
    return profile
  }
}