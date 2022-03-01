const { users, getUUID } = require('../../data/db')

const findUserByFilters = (filters) => {
  if (!filters) return -1
  const { id, email } = filters
  if (id) return users.findIndex(user => user.id === id)
  if (email) return users.findIndex(user => user.email === email)
  return -1
}

module.exports = {
  createUser: (_, { add }) => {

    const emailRegitered = users.some(user => user.email === add.email)

    if (emailRegitered) throw new Error('Email registered')

    const userCreated = {
      id: getUUID(),
      name: add.name,
      lastname: add.lastname,
      age: add.age,
      email: add.email,
      weight: 67,
      height: 167,
      vid: true
    }
    
    users.push(userCreated)
    return userCreated
  },
  deleteUserById: (_, { filters }) => {
    const index = findUserByFilters(filters)
    if (index < 0) return null
    const [deleted] = users.splice(index, 1)
    return deleted ? deleted : null
  },
  updateUser: (_, { filters, data }) => {
    const index = findUserByFilters(filters)
    if (index < 0) return null

    const updatedUser = {
      ...users[index],
      ...data
    }

    users[index] = updatedUser

    return updatedUser

  }
}