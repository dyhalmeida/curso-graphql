const jwt = require('jwt-simple')

module.exports = async ({ req }) => {

  await require('../simulate/login')(req)

  const auth = req.headers.authorization
  const token = auth && auth.substring(7)

  let user = null
  let admin = false

  if (token) {
    try {
      let payload = jwt.decode(token, process.env.APP_AUTH_SECRET)
      if (new Date(payload.exp * 1000) > new Date()) {
        user = payload
      }
    } catch (error) {
      
    }
  }

  if (user && user.profiles) {
    admin = user.profiles.includes('comum')
  }

  const error = new Error('Unauthorized')

  return {
    user,
    admin,
    userValidate() {
      if (!user) throw error
    },
    adminValidate() {
      if (!admin) throw error
    },
    filtersValidate(filters) {
      if(admin) return
      if (!user) throw error
      if (!filters) throw error

      const { id, email } = filters
      if (!id && !email) throw error
      if (id && id !== user.id) throw error
      if (email && email !== user.email) throw error
    }
  }
}