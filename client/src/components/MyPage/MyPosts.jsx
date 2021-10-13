import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import EditingStatePost from '../BoardPage/EditingStatePost';
import Comments from '../BoardPage/Comments';

const MyPostList = styled.li`
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
    height: auto;
    min-height: 35rem;
    margin: 0rem -3rem 1rem -1rem;
    min-width: 11rem;

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
  bottom: 1rem;
  width: 100%;
`;

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

export default function MyPosts({
  images,
  isLogin,
  myPost,
  modifyPostHandler,
  deletePostHandler,
  openAuthHandler,
  deleteMyPostHandler,
}) {
  const { content, background, tags, commentCount, id } = myPost;
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

  if (!myPost) return null;

  // 내가 쓴 게시물 수정 상태
  if (isModify) {
    return (
      <>
        <MyPostList>
          <EditingStatePost
            isOpenPostBoard={isModify}
            openPostBoardHandler={modifyHandler}
            post={myPost}
            modifyPostHandler={modifyPostHandler}
            setIsModify={setIsModify}
            image={image}
            randomInteger={randomInteger}
          />
        </MyPostList>
      </>
    );
  }

  if (isOpen) {
    return (
      <MyPostList>
        <Comments
          openModalHandler={openModalHandler}
          comments={comments}
          refreshHandler={refreshHandler}
          postId={id}
        />
      </MyPostList>
    );
  }

  // 내가 쓴 게시물 보통 상태
  return (
    <>
      <MyPostList
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
            <BottomBtnsContainer>
              <ModifyBtn onClick={() => setIsModify(true)}>수정</ModifyBtn>
              <DeleteBtn
                onClick={() => {
                  deletePostHandler(id);
                  deleteMyPostHandler(id);
                }}
              >
                삭제
              </DeleteBtn>
            </BottomBtnsContainer>
          </CommentsBtns>
        </BottomContainer>
      </MyPostList>
    </>
  );
}
