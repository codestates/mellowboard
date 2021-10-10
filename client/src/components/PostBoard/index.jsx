import React, {useState} from 'react';
import Button from "./Button"
import ButtonBackground from "./ButtonBackground"
import TextArea from "./TextArea"
import {ModalView, ModalBackdrop} from "./Modal"
import Wrapper from "./Wrapper";
import './index.css'
import axios from "axios"

const imageFiles = Array(20).fill(1).map((el, idx) => {
  if (`${el + idx}`.length === 1) {
    return 0 + `${el + idx}` + '.png';
  } else {
    return `${el + idx}` + '.png';
  }
})
function importAll(r) {
  let images = {};
  r.keys().forEach((item) => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
}

const images = importAll(require.context('../../images/background', false, /\.(png|jpe?g|svg)$/));


export default function PostBoard({isOpenPostBoard, openPostBoardHandler, accessToken}) {
  const [image, setImage] = useState(images['01.png']);
  const [content, setContent] = useState("");

  const randomInteger = () => {
    const random = Math.ceil(Math.random() * 20);
    setImage(images[imageFiles[random]]);
  }

  const changeContent = (event) => {
    setContent(event.target.value);
  }
  const confirm = () => {
    openPostBoardHandler();

    const hashtagRule = /\B(\#[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]+)(?!;)/;
    let hashtagList = "";
    try {
      hashtagList = hashtagRule.exec(content).input.split(" ");
    } catch (err) {
      console.log(err)
    }

    const background = imageFiles[image];

    const url = 'http://localhost:4000/posts';
    axios.post(url, {
      content  : content,
      backgroud: background,
      hashtags : hashtagList
    }, {
      headers: {
        'Authorization': "Bearer " + accessToken
      }
    }).catch((err) => {
      console.log(err);
    })

    setContent("");
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