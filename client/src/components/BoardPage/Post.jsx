import React, { useState } from 'react';
import styled from 'styled-components';
import Comments from './Comments';

export const PostList = styled.li`
  border-radius: 1rem;
  width: 100%;
  margin: 1rem -1.45rem;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 768px) {
    width: 50%;
    margin: 1rem -2rem;

    :nth-child(2n) {
      margin-left: 3.6rem;
    }
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

const TopBtns = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BackgroundBtn = styled.button`
  margin-left: 43%;
  margin-top: 1rem;
  width: 5rem;
  cursor: pointer;
`;

const CloseBtn = styled.button`
  height: 1.5rem;
  cursor: pointer;
`;

const HashtagContainer = styled.div`
  border: 3px solid black;
  margin: 1rem;
`;

const HashtagSpan = styled.span`
  border: 3px solid purple;
  margin-left: 0.5rem;
`;

const BottomBtnsContainer = styled.span`
  margin-right: 1rem;
`;

const CommentsBtns = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CommentsCnt = styled.span`
  margin: 1rem;
  border: 3px solid red;
  width: 4rem;
  cursor: pointer;
`;

const ConfirmBtn = styled.button``;

const DeleteBtn = styled.button``;

const ModifyBtn = styled.button``;

const imageFiles = Array(20)
  .fill(1)
  .map((el, idx) => {
    if (`${el + idx}`.length === 1) {
      return `0${el + idx}.png`;
    }
    const string = `${el + idx}.png`;
    return string;
  });

function importAll(r) {
  let images = {};
  r.keys().forEach((item) => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
}

const images = importAll(
  require.context('../../images/background', false, /\.(png|jpe?g|svg)$/)
);

export default function Post({
  isLogin,
  post,
  handlePostModify,
  handlePostDelete,
}) {
  const { isMine, content, background, tags, comments, id } = post;
  const [isModify, setIsModify] = useState(false);
  const [image, setImage] = useState(background);
  const [text, setText] = useState(content);

  const randomInteger = () => {
    const random = Math.ceil(Math.random() * 20);
    setImage(images[imageFiles[random]]);
  };

  const changeContent = (event) => {
    setText(event.target.value);
  };

  const confirm = (id) => {
    const hashtagRule = /(\#[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]+)(?!;)/g;
    let hashtagList = '';
    try {
      const array = [...text.matchAll(hashtagRule)].slice(0);
      hashtagList = array.map((el) => el[0]);
    } catch (err) {
      console.log(err);
    }

    handlePostModify(id, text, image, hashtagList);
  };

  if (!post) return null;

  // 내가 쓴 게시물 수정 상태
  if (isModify) {
    return (
      <>
        <PostList
          style={{
            background: `url(${image.default}) center center / cover no-repeat`,
          }}
        >
          <TopBtns>
            <BackgroundBtn onClick={randomInteger}>배경 선택</BackgroundBtn>
            <CloseBtn onclick={() => setIsModify(false)}>&times;</CloseBtn>
          </TopBtns>
          <TextArea value={text} onChange={changeContent} />
          <BottomBtnsContainer>
            <ConfirmBtn onClick={confirm(id)}>확인</ConfirmBtn>
            <DeleteBtn onClick={() => handlePostDelete(id)}>삭제</DeleteBtn>
          </BottomBtnsContainer>
        </PostList>
      </>
    );
  }

  // 내가 쓴 게시물 보통 상태
  if (isMine) {
    return (
      <>
        <PostList>
          <PostText>{content}</PostText>
          <HashtagContainer>
            {tags.map((tag) => (
              <HashtagSpan>{tag}</HashtagSpan>
            ))}
          </HashtagContainer>
          <CommentsBtns>
            <CommentsCnt onClick={() => <Comments />}>
              {`댓글 ${comments.length}개`}
            </CommentsCnt>
            <BottomBtnsContainer>
              <ModifyBtn onClick={setIsModify(true)}>수정</ModifyBtn>
              <DeleteBtn onClick={() => handlePostDelete(id)}>삭제</DeleteBtn>
            </BottomBtnsContainer>
          </CommentsBtns>
        </PostList>
      </>
    );
  }

  // 남이 쓴 게시물
  return (
    <>
      <PostList>
        <PostText>{content}</PostText>
        <HashtagContainer>
          {tags.map((tag) => (
            <HashtagSpan>{tag}</HashtagSpan>
          ))}
        </HashtagContainer>
        <CommentsCnt onClick={() => <Comments />}>
          {`댓글 ${comments.length}개`}
        </CommentsCnt>
      </PostList>
    </>
  );
}
