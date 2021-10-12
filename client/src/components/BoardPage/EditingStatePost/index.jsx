import React, { useState } from 'react';
import axios from 'axios';
import Button from './Button';
import ButtonBackground from './ButtonBackground';
import TextArea from './TextArea';
import { ModalView } from './Modal';
import Wrapper from './Wrapper';
import './index.css';

export default function EditingStatePost({
  images,
  isOpenPostBoard,
  openPostBoardHandler,
  addPostHandler,
}) {
  const [image, setImage] = useState('01.png');
  const [content, setContent] = useState('');
  const [textLength, setTextLength] = useState(0);
  const maxLength = 200;

  const randomInteger = () => {
    const random = Math.ceil(Math.random() * 20);
    setImage(imageFiles[random]);
  };

  const changeContent = (event) => {
    const text = event.target.value;
    if (text.length > maxLength) return;
    setTextLength(text.length);
    setContent(text);
  };

  const confirm = () => {
    openPostBoardHandler();

    const hashtagRule = /(\#[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]+)(?!;)/g;
    let hashtagList = '';
    try {
      const array = [...content.matchAll(hashtagRule)].slice(0);
      hashtagList = array.map((el) => el[0]);
    } catch (err) {
      console.log(err);
    }

    axios({
      method: 'post',
      url: '/posts',
      data: {
        content,
        background: image,
        tags: hashtagList,
      },
    })
      .then(() => addPostHandler())
      .catch((err) => {
        console.log(err);
      });

    setContent('');
  };

  if (isOpenPostBoard === true) {
    return (
      <>
        <ModalView
          img={images[image].default}
          onClick={(e) => e.stopPropagation()}
        >
          <ButtonBackground onClick={randomInteger}>배경 선택</ButtonBackground>
          <TextArea
            placeholder="이야기를 적어주세요."
            value={content}
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