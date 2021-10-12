const { Comment } = require("../models");

module.exports = {
  get: async (req, res) => {
    // 게시글의 댓글 조회
    const { userId } = res.locals;
    const page = req.query.page - 1;
    const size = parseInt(req.query.size);
    const comments = await Comment.findAll({
      where: {
        postId: req.query.postId,
      },
      offset: page * size,
      limit: size,
      order: [["id", "ASC"]],
    });
    const commentsCount = await Comment.count();
    const total =
      parseInt(commentsCount / size, 10) + (commentsCount % size) ? 1 : 0;

    return res.json({
      message: "해당 포스트의 댓글을 조회합니다.",
      result: true,
      comments: comments.map((el) => {
        const comment = el.toJSON();
        // 자신이 작성한 댓글인지 체크
        if (comment.userId === userId) comment.isMine = true;
        else comment.isMine = false;
        return comment;
      }),
      pages: { page, size, total },
    });
  },
  mine: async (req, res) => {
    // 내가 쓴 댓글 조회
    const { userId } = res.locals;
    const page = req.query.page - 1;
    const { size } = req.query;
    const comments = await Comment.findAll({
      where: { userId },
      offset: page * size,
      limit: size,
      order: [["id", "DESC"]],
    });
    const commentsCount = await Comment.count();
    const total =
      parseInt(commentsCount / size, 10) + (commentsCount % size) ? 1 : 0;

    return res.json({
      message: "내가 쓴 댓글 조회합니다.",
      result: true,
      comments,
      pages: { page, size, total },
    });
  },
  post: async (req, res) => {
    // 댓글 작성
    const { userId } = res.locals;
    const comment = await Comment.create({
      userId,
      postId: req.body.postId,
      comment: req.body.comment,
    });
    return res.json({
      message: "댓글을 작성했습니다.",
      result: true,
      comment,
    });
  },
  patch: async (req, res) => {
    // 게시물 수정
    const comment = await Comment.findByPk(req.body.commentId);
    if (!comment) {
      return res.status(400).json({
        message: "존재하지 않는 댓글ID 입니다.",
        result: false,
      });
    }

    // 본인의 댓글인지 확인
    if (comment.userId !== res.locals.userId)
      return res.status(403).json({
        message: "타인의 댓글은 수정할 수 없습니다.",
        result: false,
      });

    // 값 변경
    comment.comment = req.body.comment;
    comment.save();

    //  await Index.update({comment: req.body.comment}, {
    //      where: { id: req.body.commentId }
    //  })

    return res.json({
      message: "사용자가 댓글을 수정합니다.",
      result: true,
      comment,
    });
  },
  delete: async (req, res) => {
    // 댓글 삭제
    const comment = await Comment.findByPk(req.body.commentId);
    if (!comment){
      return res.status(400).json({
        message: "존재하지 않는 게시글입니다.",
        result: false,
      });
    }

    // 본인 글인지 확인
    if (comment.userId !== res.locals.userId){
      return res.status(403).json({
        message: "자신의 댓글만 삭제할 수 있습니다.",
        result: false,
      });
    }

    await Comment.destroy({
      where: { id: req.body.commentId },
    });
    return res.json({
      message: "댓글을 삭제했습니다.",
      result: true,
      commentId: req.body.commentId
    });
  },
};
