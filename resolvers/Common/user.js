const jwt = require('jwt-simple')
const { profiles: getProfiles } = require('../Type/user')

module.exports = {
  async getUserLogged(user) {
    const profiles = await getProfiles(user)
    const now = Math.floor(Date.now() / 1000)
    const userInfo = {
      ...user,
      profiles: profiles.map(profile => profile.name),
      iat: now,
      exp: now + (3 * 24 * 60 * 60)
    }
    return {
      ...userInfo,
      token: jwt.encode(userInfo, process.env.APP_AUTH_SECRET)
    }
  }
}