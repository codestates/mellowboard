const { Post, Comment } = require("../models");

module.exports = {
    get: async (req, res) => {
        // 최근 게시물 조회 
        console.log(req.query);
        const {userId} = res.locals;
        const page = req.query.page - 1;
        const size = req.query.size;
        const posts = await Post.findAll({
            offset: page * size, 
            limit: size, 
            include: {
                model: Comment, 
                limit: 2,
                order: [["id", "DESC"]]
            },
            order: [["id", "DESC"]]
        });
        const postsCount = await Post.count();
        const total = parseInt(postsCount / size, 10) + postsCount % size ? 1 : 0

        return res.json({
            message: "최근 게시글을 조회합니다.",
            result: true,
            posts: posts.map(el => {
                const post = el.toJSON();
                // 자신이 작성한 글인지 체크
                if(post.userId === userId) post.isMine = true;
                else post.isMine=false;

                // 자신이 작성한 댓글인지 체크
                post.Comments.map(comment => {
                    if(comment.userId === userId) comment.isMine = true;
                    else comment.isMine = false;
                    return comment;
                })

                // Comments 모델키 소문자로 변경..
                post.comments = post.Comments;
                delete post.Comments
                return post;
            }),
            pages: { page, size, total }
        });
    },
    mine: async (req, res) => {
        // 내가 쓴 게시물 조회
        const {userId} = res.locals;
        const page = req.query.page - 1;
        const size = req.query.size;
        const posts = await Post.findAll({
            where: {uesrId: userId},
            offset: page * size, 
            limit: size, 
            include: {
                model: Comment, 
                limit: 2,
                order: [["id", "DESC"]]
            },
            order: [["id", "DESC"]]
        });
        const postsCount = await Post.count();
        const total = parseInt(postsCount / size, 10) + postsCount % size ? 1 : 0

    return res.json({
        message: "내가 쓴 게시글을 조회합니다.",
        result: true,
        posts: posts.map(el => {
            const post = el.toJSON();
            // 자신이 작성한 글 체크
            el.isMine = true

            // 자신이 작성한 댓글인지 체크
            post.Comments.map(comment => {
                if(comment.userId === userId) comment.isMine = true;
                else comment.isMine = false;
                return comment;
            })

            // Comments 모델키 소문자로 변경..
            post.comments = post.Comments;
            delete post.Comments
            return post;
        }),
        pages: {page, size, total}
    });

    },
    post: async (req, res) => {
        // 게시물 작성
        const {userId} = res.locals;
        const post = await Post.create({
            userId: userId,
            content: req.body.content,
            background: req.body.background
        })
        return res.json({
            message: "게시글을 작성했습니다.",
            result: true,
            post 
        })
    },
    patch: async (req, res) => {
        // 게시물 수정
        const post = await Post.findByPk(req.body.post_id);
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
        const post = await Post.findByPk(req.body.post_id);
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
            where: {id: req.body.post_id}
        })
        return res.json({
            message: "게시글을 삭제했습니다.",
            result: true
        })
    }
}