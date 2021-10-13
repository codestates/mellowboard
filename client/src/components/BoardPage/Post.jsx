import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import EditingStatePost from './EditingStatePost/index';
import Comments from './Comments';
import { EditAltButton, DeleteButton } from './Button';

export const PostList = styled.li`
  background: url(${(props) => props.img}) center center / cover no-repeat;
  border-radius: 1rem;
  width: 100%;
  min-height: 30rem;
  margin: 0rem -1.2rem 1rem -1.2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  font-size: 1rem;
  color: #95a5a6;

  @media screen and (min-width: 768px) {
    width: 49%;
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
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  @media screen and (min-width: 768px) {
    font-size: 2rem;
  }
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
  width: 100%;
`;

const CommentsCnt = styled.span`
  margin: 1rem;
  width: 5rem;
  cursor: pointer;
`;

const BottomContainer = styled.div`
  position: absolute;
  width: 100%;
  bottom: 1rem;
`;

const imageFiles = Array(20)
  .fill(1)
  .map((el, idx) => {
    if (`${el + idx}`.length === 1) {
      return `0${el + idx}.png`;
    }
    const string = `${el + idx}.png`;
    return string;
  });

export default function Post({
  images,
  isLogin,
  post,
  modifyPostHandler,
  deletePostHandler,
  openAuthHandler,
  addPostHandler,
}) {
  const { isMine, content, background, tags, commentCount, id } = post;
  const [isModify, setIsModify] = useState(false);
  const [image, setImage] = useState(background);
  const [isOpen, setIsOpen] = useState(false);
  const [comments, setComments] = useState([]);

  const randomInteger = () => {
    const random = Math.ceil(Math.random() * 20);
    const a = imageFiles[random];
    setImage(a);
  };

  const openModalHandler = () => {
    setIsOpen(!isOpen);
    addPostHandler();
  };

  const refreshHandler = () => {
    if (isLogin) {
      axios({
        method: 'get',
        url: '/comments',
        params: {
          postId: id,
        },
      })
        .then((res) => {
          setComments(res.data.comments);
          !isOpen ? setIsOpen(!isOpen) : null;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      openAuthHandler();
    }
  };
  const modifyHandler = () => {
    setIsModify(!isModify);
  };

  if (!post) return null;
  // 내가 쓴 게시물 수정 상태
  if (isMine && isModify && !isOpen) {
    return (
      <>
        <PostList>
          <EditingStatePost
            isOpenPostBoard={isModify}
            openPostBoardHandler={modifyHandler}
            post={post}
            modifyPostHandler={modifyPostHandler}
            setIsModify={setIsModify}
            image={image}
            randomInteger={randomInteger}
          />
        </PostList>
      </>
    );
  }
  if (isMine && !isModify && !isOpen) {
    return (
      <>
        <PostList
          style={{
            background: `url(${process.env.PUBLIC_URL}/background/${image}) no-repeat center center/cover`,
          }}
        >
          <PostText>
            {content.split('\n').map((line) => (
              <span>
                {line}
                <br />
              </span>
            ))}
          </PostText>
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
              <BottomBtnsContainer>
                <EditAltButton onClick={modifyHandler} />
                <DeleteButton onClick={() => deletePostHandler(id)} />
              </BottomBtnsContainer>
            </CommentsBtns>
          </BottomContainer>
        </PostList>
      </>
    );
  }
  if (isOpen) {
    return (
      <PostList>
        <Comments
          openModalHandler={openModalHandler}
          comments={comments}
          refreshHandler={refreshHandler}
          postId={id}
        />
      </PostList>
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
        <PostText>
          {content.split('\n').map((line) => {
            return (
              <span>
                {line}
                <br />
              </span>
            );
          })}
        </PostText>
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
      </PostList>
    </>
  );
}
