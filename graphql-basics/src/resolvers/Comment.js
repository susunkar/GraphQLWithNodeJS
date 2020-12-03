const Comment = {
        author(parent, arg, ctx, info) {
             return ctx.db.users.find((user) => { 
                return user.id == parent.author
            })
        },
        post(parent, arg, ctx, info) {
            return ctx.db.posts.find((post) => { 
                return post.id ==parent.post
            })
        }
}

module.exports.Comment = Comment