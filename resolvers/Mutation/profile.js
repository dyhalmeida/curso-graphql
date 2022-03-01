const { profiles, getUUID } = require('../../data/db')

const findProfileByFilters = (filters) => {
  if (!filters) return -1
  const { id } = filters
  if (id) return profiles.findIndex(profile => profile.id === Number(id))
  return -1
}

module.exports = {

  createProfile: (_, { add }) => {

    let countProfile = profiles.length

    const profileRegistered = profiles.some(profile => profile.name === add.name)
    if (profileRegistered) throw new Error('Profile registered')

    const newProfile = {
      id: ++countProfile,
      name: add.name
    }

    profiles.push(newProfile)
    return newProfile

  },
  deleteProfileById: (_, { filters }) => {
    const index = findProfileByFilters(filters)
    if (index < 0) return null
    const [deleted] = profiles.splice(index, 1)
    return deleted ? deleted : null
  },
  updateProfile: (_, { filters, data }) => {
    const index = findProfileByFilters(filters)
    if (index < 0) throw new Error('Profile not found')
    const profileUpdated = {
      ...profiles[index],
      ...data
    }
    profiles[index] = profileUpdated
    return profileUpdated
  }

}