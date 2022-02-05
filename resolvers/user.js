const { profiles } = require('../data/db')

module.exports = {
  fullname: (parent) => {
    return `${parent.name} ${parent.lastname}`
  },
  profile: (parent) => {
    return profiles.find(profile => profile.id === parent.profileId)
  }
}