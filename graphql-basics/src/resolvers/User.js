const User = {
        posts(parent, args, ctx, info) {
            return ctx.db.posts.filter((post) => { 
                return post.author == parent.id
            })
        },
        comments(parent, args, ctx, info) {
            return ctx.db.comments.filter((comt) => {
                return comt.author == parent.id
            })
        }
}

module.exports.User = User