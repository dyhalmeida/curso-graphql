require('dotenv').config()
const { ApolloServer } = require('apollo-server')
const { importSchema } = require('graphql-import')
const resolvers = require('./resolvers')
const typeDefs = importSchema('./schema/index.graphql')

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen(process.env.APP_SERVER_PORT).then(({ url }) => {
  console.log(`Server is runnig on ${url}`)
})