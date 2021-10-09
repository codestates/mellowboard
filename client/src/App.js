import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Cookies } from 'react-cookie';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
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
      height: 100vh;

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

const cookies = new Cookies();

export default function App() {
  // const [isLogin, setIsLogin] = useState(false);
  const [session, setSession] = useState({ accessToken: '', isLogin: false });
  const handleSession = (token) => {
    /**
     * 세션관리 핸들러
     */
    if (!token) setSession({ accessToken: '', isLogin: false });
    else setSession({ accessToken: token, isLogin: true });
  };
  useEffect(() => {
    /**
     * 리액트가 처음 렌더링 될 때 브라우저로 쿠키에 있는 리프레쉬 토큰이 있는지 검사한다.
     * 있을 경우 accessToken을 갱신해서 로그인 상태를 true로 설정하고 토큰 상태를 등록한다.
     */
    const refreshToken = cookies.get('jwt');
    if (refreshToken) {
      // 리프레시 토큰이 있을 경우
      axios.post(`${process.env.REACT_APP_API_URI}/auth/refresh`, { withCredentials: true })
        .then((res) => res.json())
        .then((res) => {
          // API 요청이 실패되면 함수 종료
          if (!res.data.result) return;
          handleSession(res.data.accessToken);
        })
        .catch((err) => {
          // 에러발생..! 개발모드에서만 로그를 찍는다.
          if (process.env.NODE_ENV === 'development') console.log(err);
        });
    }
  }, []);

  return (
    <>
      <GlobalStyle />
      <Router>
        <Nav isLogin={session.isLogin} />
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
