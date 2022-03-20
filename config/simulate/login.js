const knex = require('../db')
const { getUserLogged } = require('../../resolvers/Common/user')

const sql = `
  select u.* from users u, users_profiles up, profiles p
  where up.user_id = u.id and
    up.profile_id = p.id and
    p.name = :profile_name
  limit 1
`

const getUser = async (profile_name) => {
  const res = await knex.raw(sql, { profile_name })
  return res ? res[0][0] : null
}

module.exports = async (req) => {
  const user = await getUser('admin')
  if (user) {
    const { token } = await getUserLogged(user)
    req.headers = {
      authorization: `Bearer ${token}`
    }
  }
}

