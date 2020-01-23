import { GraphQLServer } from 'graphql-yoga'
import mongoose from 'mongoose';

import TalkModel from './models/talk-model.js'

const typeDefs = `
  type Query {
    talks: [Talk]!
  }
  
  type Mutation {
    createTalk(title: String): Talk!
    upVoteTalk(id: String): Talk!
  }

  type Talk {
    _id: String!
    title: String!
    upVotes: Int!
  }
`;

const resolvers = {
  Query: {
    talks: async () => await TalkModel.find(),
  },
  Mutation: {
    createTalk: async (_, { title }) => {
      return await TalkModel.create({ title });
    },
    upVoteTalk: async (_, { id }) => {
      const currentTalk = await TalkModel.findById(id);
      return await TalkModel.findByIdAndUpdate(id, { upVotes: currentTalk.upVotes + 1 }, { new: true });
    }
  }
};

require('dotenv').config();

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, { useNewUrlParser: true });

const server = new GraphQLServer({ typeDefs, resolvers });

server.start({ port: 3000 }, () => console.log('Server is running on localhost:3000'));
