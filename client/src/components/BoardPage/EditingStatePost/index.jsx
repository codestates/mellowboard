import React, { useState } from 'react';
import Button from './Button';
import ButtonBackground from './ButtonBackground';
import TextArea from './TextArea';
import ModalView from './Modal';
import Wrapper from './Wrapper';
import './index.css';

export default function EditingStatePost({
  isOpenPostBoard,
  openPostBoardHandler,
  post,
  modifyPostHandler,
  setIsModify,
  image,
  randomInteger,
}) {
  const [text, setText] = useState(post.content);
  const maxLength = 200;

  const changeContent = (event) => {
    const content = event.target.value;
    if (content.length > maxLength) return;
    // setTextLength(content.length);
    setText(content);
  };

  const confirm = async () => {
    const hashtagRule = /(\#[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]+)(?!;)/g;
    let hashtagList = '';
    try {
      const array = [...text.matchAll(hashtagRule)].slice(0);
      hashtagList = array.map((el) => el[0]);
    } catch (err) {
      console.log(err);
    }
    const result = await modifyPostHandler(post, text, image, hashtagList);
    if (result) {
      setIsModify(false);
    } else {
      alert('서버와의 통신에 실패하였습니다.');
    }
  };

  if (isOpenPostBoard === true) {
    return (
      <>
        <ModalView
          style={{
            background: `url(${process.env.PUBLIC_URL}/background/${image}) no-repeat center center/cover`,
          }}
        >
          <ButtonBackground onClick={randomInteger}>배경 선택</ButtonBackground>
          <TextArea
            placeholder="이야기를 적어주세요."
            value={text}
            onChange={changeContent}
          />
          <Wrapper>
            <Button onClick={confirm}>확인</Button>
            <Button onClick={openPostBoardHandler}>취소</Button>
          </Wrapper>
        </ModalView>
      </>
    );
  }
  return null;
}
