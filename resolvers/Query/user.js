const { users } = require('../../data/db')

module.exports = {
  user: () => {
    return {
      id: 1,
      name: 'Diego',
      lastname: 'Almeida',
      email: 'dyhalmeida@gmail.com',
      weight: 90,
      height: 175,
      age: 29,
      vip: true
    }
  },
  userById: (_, { id }) => {
    const user = users.find(user => user.id === id)
    return user
  },
  users: () => {
    return users
  }
}