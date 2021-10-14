import React from 'react';
import styled from 'styled-components';

const LoadingWrapper = styled.body`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: #240229;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
`;

const Loader = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(#14ffe9, #ffeb3b, #ff00e0);
  animation: animate 0.8s linear infinite;

  @keyframes animate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  span {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: linear-gradient(#14ffe9, #ffeb3b, #ff00e0);
    animation: animate 0.8s linear infinite;
  }

  span:nth-child(1) {
    filter: blur(5px);
  }
  span:nth-child(2) {
    filter: blur(10px);
  }
  span:nth-child(3) {
    filter: blur(25px);
  }
  span:nth-child(4) {
    filter: blur(50px);
  }

  :after {
    content: '';
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
    background: #240229;
    border-radius: 50%;
  }
`;

export default function LoadingPage() {
  return (
    <>
      <LoadingWrapper>
        <Loader>
          <span />
          <span />
          <span />
          <span />
        </Loader>
      </LoadingWrapper>
    </>
  );
}
