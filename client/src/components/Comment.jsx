import React from 'react';
import styled from 'styled-components';

const CommentList = styled.li`
  border: 1px solid black;
  margin: 1rem 1rem 1rem -1.5rem;
  display: flex;
  flex-direction: column;
  font-family: 'Noto Serif KR';

  .close_btn {
    width: 1.5rem;
    margin-left: 94.5%;
  }

  .my_comment {
    display: flex;
    justify-content: space-between;
  }

  #input_btns_container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export default function Comment() {
  return (
    <>
      <CommentList>
        <span className="comment_content">공감 됩니다.</span>
      </CommentList>
      <CommentList>
        <div className="my_comment">
          <span className="comment_content">그건 아닌 것 같아요!</span>
          <span className="comment_update_btns">
            <button className="comment_modify_btn">수정</button>
            <button className="comment_modify_btn">삭제</button>
          </span>
        </div>
      </CommentList>
      <CommentList>
        <button className="close_btn">&times;</button>
        <div id="input_btns_container">
          <input className="comment_modify_input"></input>
          <span className="comment_update_btns">
            <button className="comment_modify_btn">확인</button>
            <button className="comment_modify_btn">삭제</button>
          </span>
        </div>
      </CommentList>
    </>
  );
}
