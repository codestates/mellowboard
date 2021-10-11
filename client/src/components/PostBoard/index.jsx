import React, { useState } from 'react';
<<<<<<< HEAD
import axios from 'axios';
=======
>>>>>>> 9f9c51fb87198282ed4b3028ca8386a54e7a3c19
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
<<<<<<< HEAD
    } else {
      const string = `${el + idx}` + '.png';
      return string;
    }
=======
    }
    const string = `${el + idx}` + '.png';
    return string;
>>>>>>> 9f9c51fb87198282ed4b3028ca8386a54e7a3c19
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

<<<<<<< HEAD
export default function PostBoard({
  isOpenPostBoard,
  openPostBoardHandler,
  session,
  url,
}) {
  const [image, setImage] = useState(images['01.png']);
=======
export default function PostBoard({ isOpenPostBoard, openPostBoardHandler }) {
  const url = `${process.env.REACT_APP_API_URL}/posts`;
  console.log(url);
  const [image, setImage] = useState('01.png');
>>>>>>> 9f9c51fb87198282ed4b3028ca8386a54e7a3c19
  const [content, setContent] = useState('');

  const randomInteger = () => {
    const random = Math.ceil(Math.random() * 20);
    setImage(imageFiles[random]);
  };

  const changeContent = (event) => {
    setContent(event.target.value);
  };

  const confirm = () => {
    openPostBoardHandler();

<<<<<<< HEAD
    const hashtagRule = /(\#[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]+)(?!;)/g;
=======
    const hashtagRule = /(\#[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]+\b)(?!;)/g;
>>>>>>> 9f9c51fb87198282ed4b3028ca8386a54e7a3c19
    let hashtagList = '';
    try {
      const array = [...content.matchAll(hashtagRule)].slice(0);
      hashtagList = array.map((el) => el[0]);
    } catch (err) {
      console.log(err);
    }

    axios({
      method: 'post',
<<<<<<< HEAD
      url: url,
      headers: {
        Authorization: 'Bearer ' + session.accessToken,
      },
      data: {
        content: content,
=======
      url,
      data: {
        content,
>>>>>>> 9f9c51fb87198282ed4b3028ca8386a54e7a3c19
        background: image,
        tags: hashtagList,
      },
    }).catch((err) => {
      console.log(err);
    });
    console.log(content, image, hashtagList);

    setContent('');
  };
  if (isOpenPostBoard === true) {
    return (
      <>
        <ModalBackdrop>
<<<<<<< HEAD
          <ModalView img={image.default}>
=======
          <ModalView img={images[image].default}>
>>>>>>> 9f9c51fb87198282ed4b3028ca8386a54e7a3c19
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
            </Wrapper>
          </ModalView>
        </ModalBackdrop>
      </>
    );
<<<<<<< HEAD
  } else return null;
=======
  }
  return null;
>>>>>>> 9f9c51fb87198282ed4b3028ca8386a54e7a3c19
}
