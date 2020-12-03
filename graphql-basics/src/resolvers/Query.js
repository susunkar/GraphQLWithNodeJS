const Query = {
        GetUsers(parent, args, ctx, info) {
            if (!args.query) {
                return ctx.db.users
            }
            else {
                return ctx.db.users.filter((user) => { 
                    return user.name.toLowerCase().includes(args.query.toLowerCase())
                })
            }
        },
        GetPosts(parent, args, ctx, info) {
            if (!args.pst) {
                return ctx.db.posts;
            }
            else {
                return ctx.db.posts.filter((post) => { 
                    if (post.body.toLowerCase().includes(args.pst.toLowerCase()))
                        return post.body.toLowerCase().includes(args.pst.toLowerCase())
                    else
                        return post.title.toLowerCase().includes(args.pst.toLowerCase())
                })
            }
        },
        GetCommets(parent, args, ctx, info) {
            return ctx.db.comments;
        }
}

module.exports.Query = Query