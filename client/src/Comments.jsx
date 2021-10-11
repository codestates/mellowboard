import React from 'react';
import styled from 'styled-components';
import PostBackground from './images/background/01.png';
import theme from 'styled-theming';

const CommentsModal = styled.li`
  background: url(${PostBackground}) center center / cover no-repeat;
  border: 3px solid blue;
  width: 100%;
  margin: 0rem 0rem;
  display: flex;
  flex-direction: column;

  :nth-child(2n) {
    margin-left: 3.6rem;
  }

  #top_btns {
    display: flex;
    justify-content: space-between;
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
    justify-content: space-between;
  }

  #btn_container {
    margin-right: 1rem;
  }
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

const boxBackgroundColor = theme('mode', {
  light: '#fff',
  dark: '#000',
})

const Box = styled.div`
  background-color: ${boxBackgroundColor};
`

export default function Comments({isOpen, openModalHandler}) {
  if (isOpen === false) {
    return (
      <>
        <ModalBackdrop>
          <ModalView>
            <CommentsModal>
              <h1>댓글 목록</h1>
              <div className="my_comment">
                <span className="comment_content">그건 아닌 것 같아요!</span>
                <span className="comment_update_btns">
                  <button className="comment_modify_btn">수정</button>
                  <button className="comment_modify_btn">삭제</button>
                </span>
              </div>
              <div id="comments_btns">
                <span id="btn_container">
                  <button id="modify_btn">글 보기</button>
                  <button id="cancel_btn" onClick={openModalHandler}>닫기</button>
                </span>
              </div>
            </CommentsModal>
          </ModalView>
        </ModalBackdrop>
      </>
    )
  } else {
    return null
  }
}
