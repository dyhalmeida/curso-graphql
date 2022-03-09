const knex = require('../../config/db')

module.exports = {
  profiles: async () => {
    try {
      const profiles = await knex.select('*').from('profiles')
        .then(profiles => profiles.map(profile => ({...profile})))
      return profiles
    } catch (error) {
      throw new Error("Internal server error")  
    }
  },
  profile: async (_, { filter }) => {
    try {
      const profile = await knex.select('*').from('profiles').where({ id: filter.id }).first()
      return profile
    } catch (error) {
      throw new Error("Internal server error")  
    }
  }
}