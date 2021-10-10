import React from 'react';
import CommentList from "./CommentList";

export default function Comment({comment, isEditModeComment}) {
  if (comment.isMine && isEditModeComment) {
    return (
      <>
        <CommentList>
          <div className="my_comment">
            <span className="comment_content">{comment.comment}</span>
            <span className="comment_update_btns">
            <button className="comment_modify_btn">수정</button>
            <button className="comment_modify_btn">삭제</button>
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
            <button className="comment_modify_btn">확인</button>
            <button className="comment_modify_btn">취소</button>
            <button className="comment_modify_btn">삭제</button>
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
