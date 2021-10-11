import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import Nav from './components/Nav';
import BoardPage from './pages/BoardPage';
import MyPage from './pages/MyPage';

const GlobalStyle = createGlobalStyle`
  body {
    /* font 설정 */
    font-family: 'Gugi', 'Noto Serif KR', cursive, serif;

    /* 전체 배경화면 설정 */

      background: linear-gradient(-45deg, #1B1464, #006266, #6F1E51, #cd6133);
      background-size: 400% 400%;
      animation: aurora 20s ease infinite;
      min-height: 100vh;

    /* 레이아웃 리셋 */
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  @keyframes aurora {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const PostBtn = styled.button`
  all: unset;
  cursor: pointer;
  border: 0.2rem inset #5758bb;
  border-radius: 3rem;
  width: 5rem;
  height: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: sticky;
  bottom: 3rem;
  color: #5758bb;
  margin-left: 49%;

  #pencil_icon {
    font-size: 2rem;
  }
`;

export default function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      <GlobalStyle />
      <Router>
        <Nav isLogin={isLogin} />
        <Switch>
          <Route exact path="/">
            <BoardPage />
          </Route>
          <Route path="/mypage">
            <MyPage />
          </Route>
        </Switch>
        <PostBtn>
          <FontAwesomeIcon id="pencil_icon" icon={faPencilAlt} />

          <span>글 작성</span>
        </PostBtn>
      </Router>
    </>
  );
}
