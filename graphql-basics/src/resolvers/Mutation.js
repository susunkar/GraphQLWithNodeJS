const { v4: uuidv4 } = require('uuid')

const Mutation = {
        createUser(parent, args, ctx, info) {
            const emailTaken = ctx.db.users.some((user) => { 
                                return user.email == args.inputdata.email
            })

            if (emailTaken) {
                throw new Error('Email taken.')
            }

            const usr = {
                id: uuidv4(),
                ...args.inputdata
            }

            ctx.db.users.push(usr)
            return usr
        },
        deleteUser(parent, args, ctx, info) {
            const userIndex = ctx.db.users.findIndex((user) => user.id == args.id)

            if (userIndex == 1) {
                throw new Error ('User not foung')
            }

            const deletedUser = ctx.db.users.splice(userIndex, 1)
            ctx.db.posts = ctx.db.posts.filter((pst) => {
                const match = pst.author == args.id

                if (match) {
                    ctx.db.comments = ctx.db.comments.filter((cmt) => {
                        return cmt.post != pst.id
                    })
                }
                return !match
            })

            ctx.db.comments = ctx.db.comments.filter((cmt) => {
                return cmt.author != args.id
            })

            return deletedUser[0]
    },
    updateUser(parent, args, ctx, info) {
        const { id, data } = args
        const user = ctx.db.users.find((user) => user.id == id)
        console.log(user)
        if (!user) {
                throw new Error ('User is not found.')
        }
        if (typeof data.email === 'string') {
            const emailTaken = ctx.db.users.some((user) => user.email === data.email)
            
            if (emailTaken) {
                throw new Error ('Email taken')
            }
            user.email = data.email
        }
        if (typeof data.name === 'string') {
            user.name = data.name
        }
        if (typeof data.age != 'undefined') {
            user.age = data.age
        }

        return user
    }

    ,
        createPost(parent, args, ctx, info) {
            const userExists = ctx.db.users.some((user) => { 
                return user.id == args.author
            })

            if (!userExists) {
                throw new Error ('User is not found.')
            }

            const pst = {
                id: uuidv4(),
                ...args
            }

            ctx.db.posts.push(pst)
            return pst;
        },
        createComment(parent, args, ctx, info) {
            const userExists = ctx.db.users.some((user) => user.id == args.author)
            const postExists = ctx.db.posts.some((pst) => pst.id == args.post && pst.published == true)

            if (!userExists || !postExists) {
                throw new Error("Unable to find user and post.")
            }

            const cmt = {
                id: uuidv4(),
                ...args
            }

            ctx.db.comments.push(cmt)
            return cmt
        }
}

module.exports.Mutation = Mutation