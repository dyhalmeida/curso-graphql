const { ApolloServer } = require('apollo-server')
const { importSchema } = require('graphql-import')
const resolvers = require('./resolvers')
const typeDefs = importSchema('./schema/index.graphql')

const { port } = require('./.env')

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen(port).then(({ url }) => {
  console.log(`Server is runnig on ${url}`)
})