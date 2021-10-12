import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BoardContainer from './BoardContainer';
import Post from './Post';

export default function BoardPage({ isLogin, accessToken, posts }) {
  const handlePostModify = (postId, content, background, tags) => {
    axios.patch('/posts', {
      postId,
      content,
      background,
      tags,
    });

    setPosts([
      ...posts.splice(postId, 1, {
        id: postId,
        isMine: true,
        content,
        background,
        tags,
      }),
    ]);
  };

  const handlePostDelete = (postId) => {
    axios
      .delete('/posts', {
        postId,
      })
      .catch((err) => {
        console.log(err);
      });

    setPosts([...posts.splice(postId, 1)]);
  };

  return (
    <>
      <BoardContainer>
        {posts.map((post) => (
          <Post
            key={post.id}
            isLogin={isLogin}
            post={post}
            handlePostModify={handlePostModify}
            handlePostDelete={handlePostDelete}
          />
        ))}
      </BoardContainer>
    </>
  );
}
