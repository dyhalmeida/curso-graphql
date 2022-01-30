const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`

  scalar Date

  # Pontos de entradas da API
  type Query {
    now: String!
    otherNow: Date!
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