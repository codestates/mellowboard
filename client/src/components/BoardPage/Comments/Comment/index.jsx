import React from 'react';
import CommentList from "./CommentList";
import Button from "./Button";
// comment, isEditModeComment
export default function Comment({}) {
  const comment= {};
  comment.isMine= true;
  const isEditModeComment=true;
  if (comment.isMine && isEditModeComment) {
    return (
      <>
        <CommentList>
          <div className="my_comment">
            <span className="comment_content">{comment.comment}</span>
            <span className="comment_update_btns">
              <Button>수정</Button>
              <Button>삭제</Button>
            </span>
          </div>
        </CommentList>
      </>
    );
  } else if (comment.isMine && !isEditModeComment) {
    return (
      <>
        <CommentList>
          <div id="input_btns_container">
            <input className="comment_modify_input">{comment.comment}</input>
            <span className="comment_update_btns">
            <Button>확인</Button>
            <Button>취소</Button>
            <Button>삭제</Button>
          </span>
          </div>
        </CommentList>
      </>
    );
  } else {
    return (
      <>
        <CommentList>
          <span className="comment_content">{comment.comment}</span>
        </CommentList>
      </>
    );
  }
}
