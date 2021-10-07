import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';
import BoardPage from './pages/BoardPage';
import MyPage from './pages/MyPage';

const GlobalStyle = createGlobalStyle`
  body {
    /* font 설정 */
    @import url('https://fonts.googleapis.com/css2?family=Gugi&family=Noto+Serif+KR&display=swap');
    font-family: "Gugi", 'Noto Serif KR', cursive, serif;

    /* 전체 배경화면 설정 */
      background: linear-gradient(-45deg, #1B1464, #006266, #6F1E51, #cd6133);
      background-size: 400% 400%;
      animation: aurora 20s ease infinite;
      height: 100vh;
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

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/">
            <BoardPage />
          </Route>
          <Route path="/mypage">
            <MyPage />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
