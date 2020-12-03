const { ftruncate } = require("fs");

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

const dbdata = {
    users,
    posts,
    comments
}

module.exports.db = dbdata