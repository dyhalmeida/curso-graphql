const users = [
  {
    id: 1,
    name: 'Diego',
    lastname: 'Almeida',
    email: 'dyhalmeida@gmail.com',
    weight: 90,
    height: 175,
    age: 29,
    vip: true,
    profileId: 1
  },
  {
    id: 2,
    name: 'Laura',
    lastname: 'Anghel',
    email: 'lauraanghel@gmail.com',
    weight: 25,
    height: 100,
    age: 6,
    vip: true,
    profileId: 1
  },
  {
    id: 3,
    name: 'Pricila',
    lastname: 'Mayara',
    email: 'pricilamayara@gmail.com',
    weight: 50,
    height: 165,
    age: 25,
    vip: true,
    profileId: 2
  },
]

const profiles = [
  {
    id: 1,
    name: 'comum'
  },
  {
    id: 2,
    name: 'administrador'
  }
]

module.exports = {
  users,
  profiles
}