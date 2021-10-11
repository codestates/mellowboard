import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Nav from './components/Nav';
import BoardPage from './pages/BoardPage';
import MyPage from './pages/MyPage';
import Auth from './components/Auth';
import PostBoard from './components/PostBoard';

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

axios.defaults.withCredentials = true;

export default function App() {
  const [session, setSession] = useState({ accessToken: '', isLogin: false });
  const handleSession = (token) => {
    /**
     * 세션관리 핸들러
     */
    if (!token) setSession({ accessToken: '', isLogin: false });
    else setSession({ accessToken: token, isLogin: true });
  };

  const [isOpenPostBoard, setIsOpenPostBoard] = useState(false);
  const openPostBoardHandler = () => {
    setIsOpenPostBoard(!isOpenPostBoard);
  };
  useEffect(() => {
    /**
     * 리액트가 처음 렌더링 될 때 토큰 갱신을 시도한다.
     * httpOnly 라서 자바스크립트에서 쿠키에 접근할 수 없어서 일단 갱신시도해보고 되면 isLogin=true 안되면 false
     */

    axios.post(`${process.env.REACT_APP_API_URL}/auth/refresh`, { withCredentials: true })
      .then((res) => {
        // API 요청이 실패되면 함수 종료
        if (!res.data.result) return;
        handleSession(res.data.accessToken);
      })
      .catch((err) => {
        // 에러발생..! 개발모드에서만 로그를 찍는다.
        if (process.env.NODE_ENV === 'development') console.log(err);
      });
  }, []);

  return (
    <>
      <Auth handleSession={handleSession} />
      <GlobalStyle />
      <Router>
        <Nav isLogin={session.isLogin} />
        <Switch>
          <Route exact path="/">
            <BoardPage />
            <PostBoard
              isOpenPostBoard={isOpenPostBoard}
              openPostBoardHandler={openPostBoardHandler}
              session={session}
            />
          </Route>
          <Route path="/mypage">
            <MyPage />
          </Route>
        </Switch>
        <PostBtn onClick={openPostBoardHandler}>
          <FontAwesomeIcon id="pencil_icon" icon={faPencilAlt}/>

          <span>글 작성</span>
        </PostBtn>
      </Router>
    </>
  );
}