const {GraphQLServer} = require('graphql-yoga')

//Demo User data
const users = [{
    id: '1',
    name: 'Suresh',
    email: 'suresh.kumars@live.com',
    age: 39
    },
    {
    id: '2',
    name: 'Dhakshith',
    email: 'SDSurya@live.com'
    },
    {
    id: '3',
    name: 'Alekhya',
    email: 'Alekhya@live.com',
    age: 29
    }
]
//Demo Posts data
const posts = [{
        id : "post123",
        title: "GraphQL",
        body: "Cool graphql lang",
        published: true
},
    {
        id : "post235",
        title: "ML and AI",
        body: "Azure ML and AI",
        published: true
    },
     {
        id : "post358",
        title: "Azure Certification",
        body: "Azure certification is good for prof",
        published: true
    }
]

//Scalar types: String, Boolean, Int, Float, ID, 

const typeDefs = `
    type Query {
        greeting(name: String, position: String): String!
        sum (frstNum: Float, secNum: Float): Float!
        add (numbers: [Int!]!) : Float!
        grades:[Int!]!
        me: User!
        post: Post!
        users (query: String): [User!]!
        posts (pst: String): [Post!]!
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
        greeting(parent, args, ctx, infoname) {
            console.log(args)
            if (args.name && args.position) {
                return `Hello ${args.name}! you are my favoriate ${args.position}`
            }
            return `Hello!`;
        },
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
                title: 'GraphQL 101.0',
                body: '',
                published: false
            }
        },
        sum(parent, args, ctx, info) {
            return args.frstNum + args.secNum
        },
        grades() {
            return [99,80,93]
        },
        add(parent, args, ctx, info) {
            if (args.numbers.lenght == 0) { return 0 }
            
            return args.numbers.reduce((accumulate, currentValue) => {
                return accumulate + currentValue
            })
        },
        users(parent, args, ctx, info) {
            if (!args.query) {
                return users;
            }
            else {
                return users.filter((user) => { 
                    return user.name.toLowerCase().includes(args.query.toLowerCase())
                })
            }
        },
        posts(parent, args, ctx, info) {
            if (!args.pst) {
                return posts;
            }
            else {
                return posts.filter((post) => { 
                    if (post.body.toLowerCase().includes(args.pst.toLowerCase()))
                        return post.body.toLowerCase().includes(args.pst.toLowerCase())
                    else
                        return post.title.toLowerCase().includes(args.pst.toLowerCase())
                })
            }
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('To start: npm run satart')
    console.log('The Server is up! http://localhost:4000');
})