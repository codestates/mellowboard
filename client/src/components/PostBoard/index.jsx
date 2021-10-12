import React, { useState } from 'react';
import axios from 'axios';
import Button from './Button';
import ButtonBackground from './ButtonBackground';
import TextArea from './TextArea';
import { ModalView, ModalBackdrop } from './Modal';
import Wrapper from './Wrapper';
import './index.css';

const imageFiles = Array(20)
  .fill(1)
  .map((el, idx) => {
    if (`${el + idx}`.length === 1) {
      return '0' + `${el + idx}` + '.png';
    }
    const string = `${el + idx}` + '.png';
    return string;
  });

function importAll(r) {
  const images = {};
  r.keys().forEach((item) => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
}

const images = importAll(
  require.context('../../images/background', false, /\.(png|jpe?g|svg)$/)
);

export default function PostBoard({
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
    }).catch((err) => {
      console.log(err);
    });

    addPostHandler();

    setContent('');
  };
  if (isOpenPostBoard === true) {
    return (
      <>
        <ModalBackdrop onClick={() => openPostBoardHandler()}>
          <ModalView
            img={images[image].default}
            onClick={(e) => e.stopPropagation()}
          >
            <ButtonBackground onClick={randomInteger}>
              배경 선택
            </ButtonBackground>
            <TextArea
              placeholder="이야기를 적어주세요."
              value={content}
              onChange={changeContent}
            />
            <Wrapper>
              <Button onClick={confirm}>확인</Button>
              <Button onClick={openPostBoardHandler}>취소</Button>
              {textLength}/{maxLength}
            </Wrapper>
          </ModalView>
        </ModalBackdrop>
      </>
    );
  }
  return null;
}
