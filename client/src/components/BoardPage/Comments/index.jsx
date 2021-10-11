import React from 'react';
import styled from 'styled-components';
import Comment from './Comment';

const CommentsContainer = styled.ul`
  border: 2px solid red;
`;

export default function Comments({}) {
  return (
    <>
      <CommentsContainer>
        <Comment />
      </CommentsContainer>
    </>
  );
}
