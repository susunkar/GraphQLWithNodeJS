const Post = {
        author(parent, args, ctx, info) {
            return ctx.db.users.find((user) => { 
                return user.id == parent.author
            })
        },
        comments(parent, args, ctx, info) {
            return ctx.db.comments.filter((comt) => {
                return comt.post == parent.id
            })
        }
}

module.exports.Post = Post