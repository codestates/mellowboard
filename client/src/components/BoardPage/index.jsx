import React from 'react';
import axios from 'axios';
import BoardContainer from './BoardContainer';
import Post from './Post';

export default function BoardPage({ isLogin, posts, addPostHandler, images }) {
  const handlePostModify = (postId, content, background, tags) => {};

  const handlePostDelete = (postId) => {
    axios
      .delete('/posts', {
        postId,
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <BoardContainer>
        {posts.map((post) => (
          <Post
            key={post.id}
            isLogin={isLogin}
            post={post}
            addPostHandler={addPostHandler}
            handlePostModify={handlePostModify}
            handlePostDelete={handlePostDelete}
            images={images}
          />
        ))}
      </BoardContainer>
    </>
  );
}
