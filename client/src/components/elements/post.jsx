import React from 'react';
import styled from 'styled-components';
import PostBackground from '../images/post_background/joy_1.png';

const PostList = styled.li`
  background: url(${PostBackground}) center center / cover no-repeat;
  border: 3px solid blue;
  width: 50%;
  margin: 1rem -2.3rem;
  display: flex;
  flex-direction: column;

  :nth-child(2n) {
    margin-left: 3.6rem;
  }

  #top_btns {
    display: flex;
    justify-post: space-between;
  }

  #background_btn {
    margin-left: 43%;
    margin-top: 1rem;
    width: 5rem;
    cursor: pointer;
  }

  #close_btn {
    height: 1.5rem;
    cursor: pointer;
  }

  #hash_tags {
    border: 3px solid black;
    margin: 1rem;
  }

  .hash_tag {
    border: 3px solid purple;
    margin-left: 0.5rem;
  }

  #comments_cnt {
    margin: 1rem;
    border: 3px solid red;
    width: 4rem;
    cursor: pointer;
  }

  #comments_btns {
    display: flex;
    align-items: center;
    justify-post: space-between;
  }

  #btn_container {
    margin-right: 1rem;
  }
`;

const PostText = styled.p`
  margin: 3rem 5rem;
  border: 3px solid green;
  font-family: 'Noto Serif KR';
  font-size: 1.5rem;
`;

const TextArea = styled.textarea`
  margin: 3rem 5rem;
  border: 3px solid green;
  font-family: 'Noto Serif KR';
  font-size: 1.5rem;
  height: 9rem;
  opacity: 0.4;
`;

const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: grid;
  place-items: center;
`;

const ModalView = styled.div.attrs((props) => ({
  role: 'dialog',
}))`
  border-radius: 1rem;
  background-color: white;
  width: 30rem;

  > button.close_btn {
    margin-left: 50%;
    cursor: pointer;
  }
`;

export default function Post({post, isMine}) {
  if (isMine) {
    return (
      <>
        <PostList>
          <PostText>
            {post.content}
          </PostText>
          <div id="hash_tags">
            {post.hashtag.map((el) => {
              return (<span className="hash_tag">{el}</span>);
            })}
          </div>
          <div id="comments_btns">
            <span id="comments_cnt">댓글 n개</span>
            <span id="btn_container">
            <button id="modify_btn">수정</button>
            <button id="delete_btn">삭제</button>
          </span>
          </div>
        </PostList>
      </>
    );
  } else {
    return (
      <>
        <PostList>
          <PostText>
            {post.content}
          </PostText>
          <div id="hash_tags">
            <span className="hash_tag"># hash</span>
            <span className="hash_tag"># tag</span>
          </div>
          <span id="comments_cnt">댓글 n개</span>
        </PostList>
      </>
    );
  }
}
