import React from 'react';
import styled from 'styled-components';
import Post from '../components/Post';

const BoardContainer = styled.ul`
  list-style: none;
  /* border: 5px solid red; */
  margin: 1rem;
  display: flex;
  flex-direction: column;
  height: 100%;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
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
