const { profiles } = require('../../data/db')

module.exports = {
  profiles: () => {
    return profiles
  },
  profile: (_, { id }) => {
    return profiles.find(profile => profile.id === id)
  }
}