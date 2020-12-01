const {GraphQLServer} = require('graphql-yoga')

//Scalar types: String, Boolean, Int, Float, ID, 

const typeDefs = `
    type Query {
        title: String!
        price: Float!
        releaseYear: Int
        ration: Float
        inStock: Boolean
        me: User
        post: Post
    }

    type User{
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post{
        id : ID!
        title: String!
        body: String!
        published: Boolean!
    }
`
// Resolvers
const resolvers = {
    Query: {
        title() { return "Mouse" },
        price() { return 1501.00 },
        releaseYear() { return 2009 },
        ration() { return 3.5},
        inStock() { return false },
        me() {
            return {
                id: '123098',
                name: 'Suresh Kumar',
                age: 39,
                email: 'suresh.kumars@live.com'
            };
        },
        post() {
            return {
                id: 'Post1',
                title: 'GraphQL 101',
                body: '',
                published: false
            }
        }

    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('The Server is up! http://localhost:4000');
})