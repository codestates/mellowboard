/* GET users listing. */
// 댓글 조회 - 게시글의 댓글
module.exports = {
  get: (req, res) => {
    return res.status(200).send({
      "message" : "해당 포스트의 댓글을 조회합니다.",
      "result"  : true,
      "comments":
        [{
          "id"        : "id",
          "post_id"   : "post_id",
          "isMine"    : "boolean",
          "comment"   : "comment",
          "created_at": "created_at",
          "updated_at": "updated_at"
        }, "..."],
      "pages"   : {
        "total": "total",
        "size" : "size",
        "page" : "page"
      }
    });
  },

// 댓글 조회 - 자신이 작성한 댓글
  mypage: (req, res) => {
    return res.status(200).send({
      "message" : "유저가 작성한 댓글을 조회합니다.",
      "result"  : true,
      "comments":
        [{
          "id"        : "id",
          "post_id"   : "post_id",
          "comment"   : "comment",
          "created_at": "created_at",
          "updated_at": "updated_at"
        }, "..."],
      "pages"   : {
        "total": "total",
        "size" : "size",
        "page" : "page"
      }
    });
  },

// 댓글 작성
  post: (req, res) => {
    return res.status(201).send({
      "message" : "사용자가 댓글을 작성합니다.",
      "result"  : true,
      "comments":
        {
          "id"        : "id",
          "post_id"   : "post_id",
          "comment"   : "comment",
          "created_at": "created_at",
          "updated_at": "updated_at"
        }
    });
    return res.status(403).send({
      "message": "타인의 댓글을 할 수 없습니다."
    })
  },

// 댓글 수정
  patch: (req, res) => {
    return res.status(200).send({
      "message" : "사용자가 댓글을 수정합니다.",
      "result"  : true,
      "comments":
        {
          "id"        : "id",
          "post_id"   : "post_id",
          "comment"   : "comment",
          "created_at": "created_at",
          "updated_at": "updated_at"
        }
    });
    return res.status(403).send({
      "message": "타인의 댓글은 수정할 수 없습니다."
    })
  },

// 댓글 삭제
  del: (req, res) => {
    return res.status(200).send({
      "message": "타인의 댓글은 수정할 수 없습니다."
    });
    return res.status(403).send({
      "message": "타인의 댓글은 수정할 수 없습니다."
    });
  }
};
