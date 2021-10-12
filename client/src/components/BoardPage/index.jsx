import axios from 'axios';
import BoardContainer from './BoardContainer';
import Post from './Post';

export default function BoardPage({
  isLogin,
  accessToken,
  posts,
  addPostHandler,
  modifyPostHandler,
}) {
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
            modifyPostHandler={modifyPostHandler}
            handlePostDelete={handlePostDelete}
          />
        ))}
      </BoardContainer>
    </>
  );
}
