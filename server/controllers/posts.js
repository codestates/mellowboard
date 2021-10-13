const { Post, Comment, Hashtag, PostTags, sequelize } = require("../models");

module.exports = {
    get: async (req, res) => {
        // 최근 게시물 조회 
        const {userId} = res.locals;
        const page = req.query.page - 1;
        const size = parseInt(req.query.size, 10);
        console.log(userId);
        /*
        //코멘트 같이 조회
        const posts = await Post.findAll({
            offset: page * size, 
            limit: size, 
            include: {
                model: Index,
                limit: 2,
                order: [["id", "DESC"]]
            },
            order: [["id", "DESC"]]
        });
        */
       // 게시글과 해시태그 조회 
       const postsModel = await Post.findAll({
            offset: page * size,
            limit: size,
            include: [{
                model: Hashtag, as: 'tags'
            }, {
                model: Comment,
                attributes: ["id"]
            }],
            attributes: {
                include: [[sequelize.fn("COUNT", "Index.id"), "commentCount"]]
            },
            group: ["Post.id"],
            order: [["id", "DESC"]]
       })
        const postsCount = await Post.count();
        const total = parseInt(postsCount / size, 10) + (postsCount % size ? 1 : 0)

        return res.json({
            message: "최근 게시글을 조회합니다.",
            result: true,
            posts:  postsModel.map(el => {
                const post = el.toJSON();
                // 자신이 작성한 글인지 체크
                
                if(post.userId === userId) post.isMine = true;
                else post.isMine=false;

                post.commentCount = post.Comments.length;
                delete post.Comments;
                const tagList = [];
                post.tags.map(tag => tagList.push(tag.tag));
                post.tags = tagList;

                return post;
    
                /*
                // 자신이 작성한 댓글인지 체크
                post.Index.map(comment => {
                    if(comment.userId === userId) comment.isMine = true;
                    else comment.isMine = false;
                    return comment;
                })
    
                // Index 모델키 소문자로 변경..
                post.comments = post.Index;
                delete post.Index
                */
            }),
            pages: { page: page + 1, size, total }
        });
    },
    mine: async (req, res) => {
        // 내가 쓴 게시물 조회
        const {userId} = res.locals;
        const {size} = req.query;
        const page = req.query.page - 1;
        /*
        // 댓글 같이 가져오기
        const posts = await Post.findAll({
            where: {uesrId: userId},
            offset: page * size, 
            limit: size, 
            include: {
                model: Index,
                limit: 2,
                order: [["id", "DESC"]]
            },
            order: [["id", "DESC"]]
        });
        */

        // 해시태그와 댓글개수를 포함한 게시글 가져오기
        const posts = await Post.findAll({
            where: {userId},
            offset: page * size,
            limit: size,
            attributes: {
                include: [[sequelize.fn("COUNT", "Index.id"), "commentCount"]]
            },
            include: [{
                model: Hashtag, as: 'tags',
            },{
                model: Comment,
                attributes: ["id"]
            }],
            group: ["Post.id"],
            order: [["id", "DESC"]]
        })
        const postsCount = await Post.count();
        const total = parseInt(postsCount / size, 10) + (postsCount % size ? 1 : 0)

    return res.json({
        message: "내가 쓴 게시글을 조회합니다.",
        result: true,
        posts: posts.map(el => {
            const post = el.toJSON();
            // 자신이 작성한 글 체크
            post.isMine = true
            post.commentCount = post.Comments.length;
            delete post.Comments;
            const tagList = [];
            post.tags.map(tag => tagList.push(tag.tag));
            post.tags = tagList;

            return post;

            /*
            // 자신이 작성한 댓글인지 체크
            post.Index.map(comment => {
                if(comment.userId === userId) comment.isMine = true;
                else comment.isMine = false;
                return comment;
            })

            // Index 모델키 소문자로 변경..
            post.comments = post.Index;
            delete post.Index
            */
        }),
        pages: {page, size, total}
    });

    },
    post: async (req, res) => {
        // 게시물 작성
        const {userId} = res.locals;
        let post;
        try {
            post = await Post.create({
                userId,
                content: req.body.content,
                background: req.body.background
            })
        } catch (err){
            return res.status(500).json({result: false, message: "server Error"});
        }
        // 태그 추가
        if(req.body.tags.length > 0){
            const tags = [];
            req.body.tags.forEach(async (tag) => {
                const [tagModel] = await Hashtag.findOrCreate({
                    where: {tag}, default: {tag}
                });
                tags.push(await PostTags.create({
                    PostId: post.id,
                    HashtagId: tagModel.id
                }));
            });
            // await PostTags.bulkCreate(tags);
        }
        return res.json({
            message: "게시글을 작성했습니다.",
            result: true,
            post 
        })
    },
    patch: async (req, res) => {
        // 게시물 수정
        const post = await Post.findByPk(req.body.postId);
        if(!post){
            return res.status(400).json({
                message: "존재하지 않는 게시글ID 입니다.",
                result: false
            });
        }

        // 본인의 글인지 확인
        if(post.userId !== res.locals.userId) return res.status(401).json({
            message: "타인의 게시글은 수정할 수 없습니다.",
            result: false
        })

        // 값 변경
        Object.keys(req.body).forEach(key => {
            if(req.body[key]) post[key] = req.body[key];
        })
        post.save();
        return res.json({
            message: "사용자가 게시글을 수정합니다.",
            result: true,
            post
        });
    },
    delete: async (req, res) => {
        // 게시물 삭제
        const post = await Post.findByPk(req.body.postId);
        if(!post) return res.status(400).json({
            message: "존재하지 않는 게시글입니다.",
            result: false
        })
        
        // 본인 글인지 확인
        if(post.userId !== res.locals.userId) return res.status(401).json({
            message: "자신의 게시글만 삭제할 수 있습니다.",
            result: false
        })

        await Post.destroy({
            where: {id: req.body.postId}
        })
        return res.json({
            message: "게시글을 삭제했습니다.",
            result: true
        })
    }
}