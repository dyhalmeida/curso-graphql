const { users, profiles } = require('../data/db')

module.exports = {
  now: () => {

    const now = new Date()
    const hour = now.getHours().toString().length === 1 ? `0${now.getHours()}` : `${now.getHours()}`
    const minute = now.getMinutes().toString().length === 1 ? `0${now.getMinutes()}` : `${now.getMinutes()}`
    const second = now.getSeconds().toString().length === 1 ? `0${now.getSeconds()}` : `${now.getSeconds()}`

    return `${hour}:${minute}:${second}`
  },
  otherNow: () => {
    return new Date()
  },
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
  product: () => {
    return {
      id: 1,
      name: 'Monitor LG Ultra HD',
      price: 2130.50,
      discount: 20
    }
  },
  megaSena: () => {
    return Array(6).fill(0)
      .map(() => parseInt(Math.random() * 60 + 1))
      .sort((a, b) => a - b)
  },
  users: () => {
    return users
  },
  profiles: () => {
    return profiles
  },
  profile: (_, { id }) => {
    return profiles.find(profile => profile.id === id)
  }
}