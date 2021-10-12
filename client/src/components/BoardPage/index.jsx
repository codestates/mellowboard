import axios from 'axios';
import BoardContainer from './BoardContainer';
import Post from './Post';

export default function BoardPage({
  isLogin,
  posts,
  addPostHandler,
  modifyPostHandler,
  deletePostHandler,
}) {
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
            deletePostHandler={deletePostHandler}
          />
        ))}
      </BoardContainer>
    </>
  );
}
