import React, {useState} from 'react';
import Button from './Button';
import ButtonBackground from './ButtonBackground';
import TextArea from './TextArea';
import {ModalView, ModalBackdrop} from './Modal';
import Wrapper from './Wrapper';
import './index.css';
import axios from 'axios';

const imageFiles = Array(20).fill(1).map((el, idx) => {
  if (`${el + idx}`.length === 1) {
    return '0' + `${el + idx}` + '.png';
  } else {
    const string= `${el + idx}` + '.png';
    return string;
  }
});

function importAll(r) {
  let images = {};
  r.keys().forEach((item) => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
}

const images = importAll(require.context('../../images/background', false, /\.(png|jpe?g|svg)$/));

export default function PostBoard({isOpenPostBoard, openPostBoardHandler, session}) {
  const [image, setImage] = useState(images['01.png']);
  const [content, setContent] = useState('');

  const randomInteger = () => {
    const random = Math.ceil(Math.random() * 20);
    setImage(images[imageFiles[random]]);
  };

  const changeContent = (event) => {
    setContent(event.target.value);
  };

  const confirm = () => {
    openPostBoardHandler();

    const hashtagRule = /(\#[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]+\b)(?!;)/g;
    let hashtagList = "";
    try {
      const array = [...content.matchAll(hashtagRule)].slice(0);
      hashtagList = array.map(el => el[0]);
    } catch (err) {
      console.log(err);
    };

    const url = 'http://localhost:4000/posts';
    axios({
      method : 'post',
      url    : url,
      headers: {
        'Authorization': 'Bearer ' + session.accessToken
      },
      data   : {
        'content'   : content,
        'background': image,
        'tags'      : hashtagList
      }
    }).catch((err) => {
      console.log(err);
    });
    console.log(content, image, hashtagList);

    setContent('');
  }
  if (isOpenPostBoard === true) {
    return (
      <>
        <ModalBackdrop>
          <ModalView
            img={image.default}
          >
            <ButtonBackground onClick={randomInteger}>배경 선택</ButtonBackground>
            <TextArea placeholder="이야기를 적어주세요." value={content} onChange={changeContent}/>
            <Wrapper>
              <Button onClick={confirm}>확인</Button>
              <Button onClick={openPostBoardHandler}>취소</Button>
            </Wrapper>
          </ModalView>
        </ModalBackdrop>
      </>
    )
  } else return null
}