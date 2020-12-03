const {GraphQLServer} = require('graphql-yoga')
const { v4 : uuidv4 } = require('uuid')

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
        email: 'SDSurya@live.com',
    age: 6
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
        id : "Post1",
        title: "GraphQL",
        body: "Cool graphql lang",
        published: true,
        author: '1'
},
    {
        id : "Post2",
        title: "ML and AI",
        body: "Azure ML and AI",
        published: true,
        author: '1'
    },
     {
        id : "Post3",
        title: "Azure Certification",
        body: "Azure certification is good for prof",
        published: true,
        author: '2'
    }
]

const comments = [
    {
        id: "Cmt-1",
        text: "First comments!",
        author: "2",
        post: "Post1"
    }, {
        
        id: "Cmt-2",
        text: "Second comments!",
        author: "2",
        post: "Post3"
    }, {
        
        id: "Cmt-3",
        text: "Third comments!",
        author: "3",
        post: "Post3"
    }, {
        
        id: "Cmt-4",
        text: "Fourth comments!",
        author: "1",
        post: "Post2"
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
        GetUsers (query: String): [User!]!
        GetPosts (pst: String): [Post!]!
        GetCommets: [Comment!]!
    }
    
    type Mutation {
        createUser(name: String!, email: String!, age: Int) : User!
        createPost(title: String!, body: String!, published : Boolean!, author: ID!): Post!
        createComment(text: String!, author: ID!, post: ID!) : Comment!
    }

    type User{
        id: ID!
        name: String!
        email: String!
        age: Int!
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post{
        id : ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }

    type Comment{
        id: ID!
        text: String!
        author: User!
        post: Post!
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
        GetUsers(parent, args, ctx, info) {
            if (!args.query) {
                return users;
            }
            else {
                return users.filter((user) => { 
                    return user.name.toLowerCase().includes(args.query.toLowerCase())
                })
            }
        },
        GetPosts(parent, args, ctx, info) {
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
        },
        GetCommets(parent, args, ctx, info) {
            return comments;
        }
    },
    Mutation: {
        createUser(parent, args, ctx, info) {
            const emailTaken = users.some((user) => { 
                                return user.email == args.email
            })

            if (emailTaken) {
                throw new Error('Email taken.')
            }

            const usr = {
                id: uuidv4(),
                name : args.name,
                email: args.email,
                age: args.age
            }

            users.push(usr)
            return usr
        },
        createPost(parent, args, ctx, info) {
            const userExists = users.some((user) => { 
                return user.id == args.author
            })

            if (!userExists) {
                throw new Error ('User is not found.')
            }

            const pst = {
                id: uuidv4(),
                title: args.title,
                body: args.body,
                published: args.published,
                author: args.author
            }

            posts.push(pst)
            return pst;
        },
        createComment(parent, args, ctx, info) {
            const userExists = users.some((user) => user.id == args.author)
            const postExists = posts.some((pst) => pst.id == args.post && pst.published == true)

            if (!userExists || !postExists) {
                throw new Error("Unable to find user and post.")
            }

            const cmt = {
                id: uuidv4(),
                text: args.text,
                author: args.author,
                post: args.post
            }

            comments.push(cmt)
            return cmt
        }
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => { 
                return user.id == parent.author
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comt) => {
                return comt.post == parent.id
            })
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter((post) => { 
                return post.author == parent.id
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comt) => {
                return comt.author == parent.id
            })
        }
    },
    Comment: {
        author(parent, arg, ctx, info) {
             return users.find((user) => { 
                return user.id == parent.author
            })
        },
        post(parent, arg, ctx, info) {
            return posts.find((post) => { 
                return post.id ==parent.post
            })
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