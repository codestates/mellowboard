import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Comments from './Comments';

export const PostList = styled.li`
  border-radius: 1rem;
  width: 100%;
  min-height: 30rem;
  margin: 0rem -1.2rem 1rem -1.2rem;
  display: flex;
  flex-direction: column;
  position: relative;
  font-size: 1rem;
  color: #95a5a6;

  @media screen and (min-width: 768px) {
    width: 49%;
    min-width: 21.5rem;
    height: auto;
    min-height: 35rem;
    margin: 0rem -3rem 1rem -1rem;

    :nth-child(2n) {
      margin-left: 4rem;
    }
  }
`;

const PostText = styled.p`
  margin: 1rem;
  font-family: 'KyoboHand';
  color: white;
  text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000;
  font-size: 1.5rem;
  word-break: break-all;

  @media screen and (min-width: 768px) {
    font-size: 2rem;
  }
`;

const TextArea = styled.textarea`
  margin: 3rem 5rem;
  font-family: 'KyoboHand';
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
  margin: 1rem;
`;

const HashtagSpan = styled.span`
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
  width: 4rem;
  cursor: pointer;
`;

const BottomContainer = styled.div`
  position: absolute;
  bottom: 1rem;
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
  modifyPostHandler,
  handlePostDelete,
}) {
  const { isMine, content, background, tags, commentCount, id } = post;
  const [isModify, setIsModify] = useState(false);
  const [image, setImage] = useState(background);
  const [text, setText] = useState(content);
  const [isOpen, setIsOpen] = useState(false);
  const [comments, setComments] = useState([]);

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

    modifyPostHandler(id, text, image, hashtagList);
  };

  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };

  const refreshHandler = () => {
    axios({
      method: 'get',
      url: '/comments',
      params: {
        postId: 1,
      },
    })
      .then((res) => {
        setCommentsState(res.data.comments);
        !isOpen ? setIsOpen(!isOpen) : null;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(isMine);

  if (!post) return null;

  // 내가 쓴 게시물 수정 상태
  if (isModify) {
    return (
      <>
        <PostList
          style={{
            background: `url(${process.env.PUBLIC_URL}/background/${image}) no-repeat center center/cover`,
          }}
        >
          <TopBtns>
            <BackgroundBtn onClick={randomInteger}>배경 선택</BackgroundBtn>
            <CloseBtn onclick={() => setIsModify(false)}>&times;</CloseBtn>
          </TopBtns>
          <TextArea value={text} onChange={changeContent} />
          <BottomContainer>
            <BottomBtnsContainer>
              <ConfirmBtn onClick={confirm(id)}>확인</ConfirmBtn>
              <DeleteBtn onClick={() => handlePostDelete(id)}>삭제</DeleteBtn>
            </BottomBtnsContainer>
          </BottomContainer>
        </PostList>
      </>
    );
  }
  // 내가 쓴 게시물 보통 상태
  if (isMine) {
    return (
      <>
        <PostList
          style={{
            background: `url(${process.env.PUBLIC_URL}/background/${image}) no-repeat center center/cover`,
          }}
        >
          <PostText>{content}</PostText>
          <BottomContainer>
            <HashtagContainer>
              {tags.map((tag) => (
                <HashtagSpan>{tag}</HashtagSpan>
              ))}
            </HashtagContainer>
            <CommentsBtns>
              <CommentsCnt onClick={refreshHandler}>
                {`댓글 ${commentCount}개`}
              </CommentsCnt>
              {isOpen === true ? (
                <Comments
                  openModalHandler={openModalHandler}
                  comments={comments}
                  refreshHandler={refreshHandler}
                />
              ) : null}
              <BottomBtnsContainer>
                <ModifyBtn onClick={setIsModify(true)}>수정</ModifyBtn>
                <DeleteBtn onClick={() => handlePostDelete(id)}>삭제</DeleteBtn>
              </BottomBtnsContainer>
            </CommentsBtns>
          </BottomContainer>
        </PostList>
      </>
    );
  }

  // 남이 쓴 게시물
  return (
    <>
      <PostList
        style={{
          background: `url(${process.env.PUBLIC_URL}/background/${image}) no-repeat center center/cover`,
        }}
      >
        <PostText>{content}</PostText>
        <BottomContainer>
          <HashtagContainer>
            {tags.map((tag) => (
              <HashtagSpan>{tag}</HashtagSpan>
            ))}
          </HashtagContainer>
          <CommentsCnt onClick={refreshHandler}>
            {`댓글 ${commentCount}개`}
          </CommentsCnt>
        </BottomContainer>
        {isOpen === true ? (
          <Comments
            openModalHandler={openModalHandler}
            comments={comments}
            refreshHandler={refreshHandler}
          />
        ) : null}
      </PostList>
    </>
  );
}
