import React, { useState } from 'react';
import styled from 'styled-components';
import MyPosts from './MyPosts';
import MyComments from './MyComments/index';
import MyInfo from './MyInfo';

const TabMenu = styled.ul`
  background-color: #dcdcdc;
  margin: 1rem;
  color: rgba(73, 73, 73, 0.5);
  border-radius: 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  list-style: none;
  -webkit-padding-start: 0;
  text-align: center;
  position: sticky;
  top: 3.5rem;
  z-index: 1;
  font-size: 0.8rem;
  font-weight: bold;

  @media screen and (min-width: 768px) {
    font-size: 1rem;
    top: 6rem;
  }

  .submenu {
    width: 100%;
    padding: 1rem;
    cursor: pointer;
  }

  .focused {
    width: 100%;
    background-color: navy;
    border-radius: 0.5rem;
    color: rgba(255, 255, 255, 1);
    transition: 0.5s ease;
  }
`;

const MyPostsContainer = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-top: 1rem;
  min-width: 20rem;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    max-width: 55rem;
  }
`;

const MyContentsContainer = styled.ul`
  text-align: center;
  height: 100%;
  margin: 1rem 1rem -4.5rem 1rem;
  -webkit-padding-start: 0;
  list-style: none;
  min-width: 22rem;
  font-size: 0.5rem;

  @media screen and (min-width: 768px) {
    font-size: 1rem;
    min-width: 45rem;
  }
`;

export default function MyPage({
  isLogin,
  modifyPostHandler,
  deletePostHandler,
  images,
  openAuthHandler,
  deleteMyPostHandler,
  myPosts,
}) {
  const [currentTab, setCurrentTab] = useState(0);

  const menuArr = [
    { name: '작성한 글', content: <MyPosts /> },
    {
      name: '작성한 댓글',
      content: <MyComments />,
    },
    { name: '내 정보 보기', content: <MyInfo /> },
  ];

  const selectMenuHandler = (index) => {
    setCurrentTab(index);
  };

  return (
    <>
      <TabMenu>
        {menuArr.map((el, index) => (
          <li
            key={index}
            className={currentTab === index ? 'submenu focused' : 'submenu'}
            onClick={() => selectMenuHandler(index)}
          >
            {el.name}
          </li>
        ))}
      </TabMenu>

      {currentTab === 0 ? (
        <MyPostsContainer>
          {myPosts.map((myPost) => (
            <MyPosts
              key={myPost.id}
              isLogin={isLogin}
              modifyPostHandler={modifyPostHandler}
              deletePostHandler={deletePostHandler}
              images={images}
              openAuthHandler={openAuthHandler}
              myPost={myPost}
              deleteMyPostHandler={deleteMyPostHandler}
            />
          ))}
        </MyPostsContainer>
      ) : (
        <MyContentsContainer>{menuArr[currentTab].content}</MyContentsContainer>
      )}
    </>
  );
}
