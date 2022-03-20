const knex = require('../../config/db')
const bcrypt = require('bcrypt-nodejs')
const { getUserLogged } = require('../Common/user')

module.exports = {
  login: async (_, { data }) => {
    
    const user = await knex.select('*').from('users').where({ email: data.email }).first()
    if (!user) throw new Error("Unauthorized")

    const isEqualPassword = bcrypt.compareSync(data.password, user.password)

    if (!isEqualPassword) throw new Error("Unauthorized")

    return getUserLogged(user)

  },
  users: (parent, args, ctx) => {
    ctx && ctx.adminValidate()
    try {
      return knex.select('*').from('users')
    } catch (error) {
      throw new Error("Internal server error")  
    }
  },
  user: (_, { filters }, ctx) => {
    ctx && ctx.filtersValidate(filters)
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