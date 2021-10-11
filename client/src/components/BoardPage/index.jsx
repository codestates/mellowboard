import React from 'react';
import Post from './Post';
import BoardContainer from "./BoardContainer";

export default function BoardPage() {
  return (
    <>
      <BoardContainer>
        <Post />
      </BoardContainer>
    </>
  );
}
