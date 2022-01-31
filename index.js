const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`

  scalar Date

  type User {
    id: ID!
    name: String!
    lastname: String!
    fullname: String!
    email: String
    weight: Float!
    height: Float!
    age: Int!
    vip: Boolean!
  }

  # Pontos de entradas da API
  type Query {
    now: String!
    otherNow: Date!
    user: User
  }
`
const resolvers = {
  Query: {
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
    }
  },
  User: {
    fullname: (parent) => {
      return `${parent.name} ${parent.lastname}`
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`Server is runnig on ${url}`)
})