const knex = require('../../config/db')

module.exports = {
  users: (profile) => {
    return knex('users')
    .join(
      'users_profiles',
      'users.id',
      'users_profiles.user_id'
    ).where({ profile_id: profile.id })
  }
}