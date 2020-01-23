import { GraphQLServer } from 'graphql-yoga'

import { talksMock } from './talks-mock';

const typeDefs = `
  type Query {
    talks: [Talk]!
  }

  type Talk {
    id: ID!
    name: String!
  }
`

const resolvers = {
  Query: {
    talks: () => talksMock,
  },
}

const server = new GraphQLServer({ typeDefs, resolvers })
server.start({ port: 3000 }, () => console.log('Server is running on localhost:3000'));
