const { users, getUUID } = require('../data/db')

module.exports = {
  createUser: (_, { name, lastname, age, email }) => {

    const emailRegitered = users.some(user => user.email === email)

    if (emailRegitered) throw new Error('Email registered')

    const userCreated = {
      id: getUUID(),
      name,
      lastname,
      age,
      email,
      weight: 67,
      height: 167,
      age: 23,
      vip: true
    }
    
    users.push(userCreated)
    return userCreated
  },
  deleteUserById: (_, { id }) => {
    const index = users.findIndex(user => user.id === id)
    if (!index) return null
    const [deleted] = users.splice(index, 1)
    return deleted ? deleted : null
  }
}