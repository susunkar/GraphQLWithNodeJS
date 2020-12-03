const {GraphQLServer} = require('graphql-yoga')

const { db }  = require('./db')
const { Query} = require('./resolvers/Query')
const { Mutation } = require('./resolvers/Mutation')
const { User } = require('./resolvers/User')
const { Post } = require('./resolvers/Post')
const { Comment } = require('./resolvers/Comment')

const server = new GraphQLServer({
    typeDefs:'./src/schema.graphql',
    resolvers: {
        Query,
        Mutation,
        User,
        Post,
        Comment
    },
    context: {
        db
    }
})

server.start(() => {
    console.log('To start: npm run satart')
    console.log('The Server is up! http://localhost:4000');
})