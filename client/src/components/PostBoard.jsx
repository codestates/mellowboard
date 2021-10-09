import React, {useState} from 'react';
import styled from "styled-components";
import PostBackground from "../images/background/01.png";
const imageFiles = Array(20).fill(1).map((el, idx) => {
  if (`${el + idx}`.length === 1) {
    return 0 + `${el + idx}` + '.png'
  } else {
    return `${el + idx}` + '.png'
  }
})
const image1= require('../images/background/'+imageFiles[0]).default;
const PostBoardModal = styled.li`
  background: url(${props => props.img}) center center / cover no-repeat;
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
  margin: 1rem 1rem;
  border: 3px solid green;
  font-family: 'Noto Serif KR';
  font-size: 1.5rem;
  height: 35rem;
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

export default function PostBoard({isOpenPostBoard, openPostBoardHandler}) {
  console.log("PostBoard", isOpenPostBoard, PostBackground)
  const [image, setImage] = useState(0);
  const randomInteger = () => {
    const random = Math.ceil(Math.random() * 20);
    setImage(random);
  }

  if (isOpenPostBoard === true) {
    return (
      <>
        <ModalBackdrop>
          <ModalView>
            {/* 연속 클릭시 undefined 라서 01.png 추가 */}
            <PostBoardModal img={require('../images/background/'+(imageFiles[image] ? imageFiles[image] : '01.png')).default}>
              <h1>
                글 작성
              </h1>
              <div id="top_btns">
                <button id="background_btn" onClick={randomInteger}>배경 선택</button>
              </div>
              <TextArea></TextArea>
              <div id="hash_tags">
                <input className="input_hash_tag" value="#" placeholder="#"></input>
                <input className="input_hash_tag" placeholder="#"></input>
              </div>
              <div id="comments_btns">
                <span id="btn_container">
                  <button id="modify_btn" onClick={openPostBoardHandler}>확인</button>
                  <button id="cancel_btn" onClick={openPostBoardHandler}>취소</button>
                </span>
              </div>
            </PostBoardModal>
          </ModalView>
        </ModalBackdrop>
      </>
    )
  } else {
    return null
    return (
      <>
        data.map( el => {<Comment content={"Values"}/>})
      </>
    )
  }
}