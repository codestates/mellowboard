import React from 'react';
import styled from 'styled-components';

const MyCommentList = styled.li`
  border: 2px solid black;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: 'Noto Serif KR';
  font-size: 3rem;

  .close_btn {
    width: 1.5rem;
    margin-left: 98%;
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

export default function MyComments() {
  return (
    <>
      <MyCommentList>
        <div className="my_comment">
          <span className="comment_content">그건 아닌 것 같아요!</span>
          <span className="comment_update_btns">
            <button className="comment_modify_btn">수정</button>
            <button className="comment_modify_btn">삭제</button>
          </span>
        </div>
      </MyCommentList>
      <MyCommentList>
        <button className="close_btn">&times;</button>
        <div id="input_btns_container">
          <input className="comment_modify_input"></input>
          <span className="comment_update_btns">
            <button className="comment_modify_btn">확인</button>
            <button className="comment_modify_btn">삭제</button>
          </span>
        </div>
      </MyCommentList>
      <MyCommentList>
        <div className="my_comment">
          <span className="comment_content">공감 됩니다.</span>
          <span className="comment_update_btns">
            <button className="comment_modify_btn">수정</button>
            <button className="comment_modify_btn">삭제</button>
          </span>
        </div>
      </MyCommentList>
    </>
  );
}
