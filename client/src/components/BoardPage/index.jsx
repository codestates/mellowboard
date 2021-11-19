import React from 'react';
import BoardContainer from './BoardContainer';
import Post from './Post';

export default function BoardPage({
  isLogin,
  posts,
  modifyPostHandler,
  deletePostHandler,
  openAuthHandler,
  addPostHandler,
}) {
  return (
    <>
      <BoardContainer>
        {posts.map((post) => (
          <Post
            key={post.id}
            isLogin={isLogin}
            post={post}
            modifyPostHandler={modifyPostHandler}
            deletePostHandler={deletePostHandler}
            openAuthHandler={openAuthHandler}
            addPostHandler={addPostHandler}
          />
        ))}
      </BoardContainer>
    </>
  );
}
