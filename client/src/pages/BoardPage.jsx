import React from 'react';
import styled from 'styled-components';
import Post from '../components/Post';

const BoardContainer = styled.ul`
  list-style: none;
  border: 5px solid red;
  margin: 1rem 1rem -4.5rem 1rem;
  display: flex;
  flex-wrap: wrap;
  height: 100%;
`;

export default function BoardPage() {
  return (
    <>
      <BoardContainer>
        <Post />
      </BoardContainer>
    </>
  );
}
