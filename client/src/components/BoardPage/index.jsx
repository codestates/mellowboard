import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BoardContainer from './BoardContainer';
import Post from './Post';

export default function BoardPage({ isLogin, accessToken }) {
  const [posts, setPosts] = useState([]);
  console.log(`Bearer ${accessToken}`);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/posts`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        setPosts(res.data.posts);
      });
  }, []);

  const handlePostModify = (postId, content, background, tags) => {
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/posts`,
        { headers: { Authorization: `Bearer ${accessToken}` } },
        {
          postId,
          content,
          background,
          tags,
        }
      )
      .catch((err) => {
        console.log(err);
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
