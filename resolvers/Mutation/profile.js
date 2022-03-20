const knex = require('../../config/db')

const { profile: showProfile } = require('../Query/profile')

module.exports = {
  createProfile: async (_, { data }, ctx) => {

    ctx && ctx.adminValidate()

    try {
      const [id] = await knex.insert(data).into('profiles')
      return knex.select('*').from('profiles').where({ id }).first()
    } catch (error) {
      throw new Error(error.sqlMessage)
    }
  },
  deleteProfile: async (_, { filters }, ctx) => {
    ctx && ctx.adminValidate()
    try {

      const profile = await showProfile(_, { filters })

      if (!profile) return null

      await knex.delete().from('users_profiles').where({ profile_id: profile.id })        
      await knex.delete().from('profiles').where({ id: profile.id })        
      return profile

    } catch (error) {
      if (error.sqlMessage || error.message) {
        throw new Error(error.sqlMessage || error.message)
      }
      throw new Error('Internal server error')
    } 
  },
  updateProfile: async (_, { filters, data }, ctx) => {
    ctx && ctx.adminValidate()
    try {
      const profile = await showProfile(_, { filters })
      if (!profile) return null

      await knex('profiles').update({ ...data }).where({ id: profile.id })

      return {...profile, ...data}
      
    } catch (error) {
      if (error.sqlMessage || error.message) {
        throw new Error(error.sqlMessage || error.message)
      }
      throw new Error('Internal server error')
    }
  }
}