import React from 'react';
import styled from 'styled-components';
import Post from '../components/Post';

const BoardContainer = styled.section`
  border: 5px solid Blue;
  margin: 1rem 1rem -4.5rem 1rem;
  display: flex;
  height: 100%;
`;

const LeftBoardContainer = styled.ul`
  list-style: none;
  border: 5px solid red;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const RightBoardContainer = styled.ul`
  list-style: none;
  border: 5px solid black;
  margin: 1rem;
  display: flex;
  flex-direction: column-reverse;
  height: 100%;
`;

export default function BoardPage() {
  return (
    <>
      <BoardContainer>
        <LeftBoardContainer>
          <Post />
        </LeftBoardContainer>
        <RightBoardContainer>
          <Post />
        </RightBoardContainer>
      </BoardContainer>
    </>
  );
}
