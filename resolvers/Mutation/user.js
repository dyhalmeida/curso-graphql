const knex = require('../../config/db')
const bcrypt = require('bcrypt-nodejs')
const { profile: showProfile } = require('../Query/profile')
const { user: showUser } = require('../Query/user')

const mutations = {
  createPublicUser: async (_, { data }) => {
    return mutations.createUser(_, { data })
  },
  createUser: async (_, { data }, ctx) => {
    ctx && ctx.adminValidate()
    try {

      const profiles_id = []

      if(!data.profiles || !data.profiles.length) {
        data.profiles = [
          { name: "comum" }
        ]
      }

      for (const filters of data.profiles) {
        const profile = await showProfile(_, { filters })
        if (profile) profiles_id.push(profile.id)
      }

      delete data.profiles

      const salt = bcrypt.genSaltSync()
      data.password = bcrypt.hashSync(data.password, salt)

      const [ user_id ] = await knex.insert(data).into('users')

      // Association
      for (const profile_id of profiles_id) {
        await knex.insert({
          profile_id,
          user_id
        }).into('users_profiles')
      }

      return knex.select('*').from('users').where({ id: user_id }).first()

    } catch (error) {
      if (error.sqlMessage) {
        throw new Error(error.sqlMessage)
      }
      throw new Error('Internal server error')
    } 
  },
  deleteUser: async (_, { filters }, ctx) => {
    ctx && ctx.adminValidate()
    try {

      const user = await showUser(_, { filters })

      if (!user) return null

      await knex.delete().from('users_profiles').where({ user_id: user.id })
      await knex.delete().from('users').where({ id: user.id })
      return user

    } catch (error) {
      if (error.sqlMessage || error.message) {
        throw new Error(error.sqlMessage || error.message)
      }
      throw new Error('Internal server error')
    } 
  },
  updateUser: async (_, { filters, data }, ctx) => {
    ctx && ctx.filtersValidate(filters)
    try {

      const user = await showUser(_, { filters })

      if (!user) return null

      if (ctx.admin && data.profiles) {
        await knex.delete().from('users_profiles').where({ user_id: user.id })

        for (const filters of data.profiles) {
          const profile = await showProfile(_, { filters })
          if (profile) {
            await knex.insert({
              profile_id: profile.id,
              user_id: user.id
            }).into('users_profiles')
          }
        }
      }

      delete data.profiles
      if (data.password) {
        data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync())
      }
      await knex('users').update({ ...data }).where({ id: user.id })
      return {...user, ...data}
      
    } catch (error) {
      if (error.sqlMessage || error.message) {
        throw new Error(error.sqlMessage || error.message)
      }
      throw new Error('Internal server error')
    }
  }
}

module.exports = mutations