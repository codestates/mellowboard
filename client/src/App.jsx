import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import axios from 'axios';
import Nav from './components/Nav';
import setAxios, { updateToken } from './ApiController';
import BoardPage from './components/BoardPage';
import MyPage from './components/MyPage';
import Auth from './components/Auth';
import PostBoard from './components/PostBoard';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const GlobalStyle = createGlobalStyle`
  body {
    /* font 설정 */
    font-family: 'Gugi', 'Noto Serif KR', cursive, serif;

    @font-face {
      font-family: 'Bazzi';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/Bazzi.woff') format('woff');
      font-weight: normal;
      font-style: normal;
    }

    @font-face {
      font-family: 'SDSamliphopangche_Outline';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts-20-12@1.0/SDSamliphopangche_Outline.woff') format('woff');
      font-weight: normal;
      font-style: normal;
    }

    @font-face {
      font-family: 'KyoboHand';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@1.0/KyoboHand.woff') format('woff');
      font-weight: normal;
      font-style: normal;
    }

    /* 전체 배경화면 설정 */

    background: linear-gradient(-45deg, #1B1464, #006266, #6F1E51, #cd6133);
    background-size: 400% 400%;
    animation: aurora 15s ease infinite;
    min-height: 100vh;

    /* 레이아웃 리셋 */
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
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

const PostBtnContainer = styled.div`
  display: flex;
  justify-content: center;
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
  position: fixed;
  bottom: 3rem;
  color: #5758bb;
  background-color: #6d214f;
  /* margin-left: 50%; */

  #pencil_icon {
    font-size: 2rem;
  }
`;

export default function App() {
  const [session, setSession] = useState({ accessToken: '', isLogin: false });
  const [posts, setPosts] = useState([]);

  const addPostHandler = () => {
    axios
      .get('/posts')
      .then((res) => {
        setPosts(res.data.posts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const modifyPostHandler = (postId, content, background, tags) => {
    axios
      .patch('/posts', {
        postId,
        content,
        background,
        tags,
      })
      .then(() => {
        setPosts([
          ...posts.splice(postId, 1, {
            id: postId,
            isMine: true,
            content,
            background,
            tags,
          }),
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletePostHandler = (postId) => {
    console.log(`포스트아이디 ${postId}`);
    axios
      .delete('/posts', {
        postId,
      })
      .then(() => {
        setPosts([...posts.splice(postId, 1)]);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const handleSession = (token) => {
    /**
     * 세션관리 핸들러
     */
    if (!token) setSession({ accessToken: '', isLogin: false });
    else setSession({ accessToken: token, isLogin: true });
  };
  const [isOpenAuth, setIsOpenAuth] = useState(false);
  const [isOpenPostBoard, setIsOpenPostBoard] = useState(false);
  const openAuthHandler = () => {
    setIsOpenAuth(!isOpenAuth);
  };
  const openPostBoardHandler = () => {
    setIsOpenPostBoard(!isOpenPostBoard);
  };

  useEffect(async () => {
    /**
     * 리액트가 처음 렌더링 될 때 토큰 갱신을 시도한다.
     * httpOnly 라서 자바스크립트에서 쿠키에 접근할 수 없어서 일단 갱신시도해보고 되면 isLogin=true 안되면 false
     */

    // axios global 설정
    setAxios(handleSession);
    let newToken;
    try {
      newToken = await updateToken();
    } catch {}

    handleSession(newToken);
    axios
      .get('/posts', { headers: { Authorization: `Bearer ${newToken}` } })
      .then((res) => {
        setPosts(res.data.posts);
      });
  }, []);

  useEffect(() => {
    /**
     * session이 변경되면 axios의 헤더값을 수정한다.
     */
    axios.defaults.headers.common = {
      Authorization: `Bearer ${session.accessToken}`,
    };
  }, [session]);

  function importAll(r) {
    const images = {};
    r.keys().forEach((item) => {
      images[item.replace('./', '')] = r(item);
    });
    return images;
  }

  const images = importAll(
    require.context('./images/background', false, /\.(png|jpe?g|svg)$/)
  );

  return (
    <>
      <Auth
        handleSession={handleSession}
        openAuthHandler={openAuthHandler}
        isOpenAuth={isOpenAuth}
      />
      <PostBoard
        isOpenPostBoard={isOpenPostBoard}
        openPostBoardHandler={openPostBoardHandler}
        session={session}
        addPostHandler={addPostHandler}
        images={images}
      />
      <GlobalStyle />
      <Router>
        <Nav
          openAuthHandler={openAuthHandler}
          session={session}
          handleSession={handleSession}
        />
        <Switch>
          <Route exact path="/">
            <BoardPage
              isLogin={session.isLogin}
              posts={posts}
              modifyPostHandler={modifyPostHandler}
              deletePostHandler={deletePostHandler}
              openAuthHandler={openAuthHandler}
              addPostHandler={addPostHandler}
              images={images}
            />
          </Route>
          <Route path="/mypage">
            {session.isLogin ? <MyPage /> : <Redirect to="/" />}
          </Route>
        </Switch>
        <PostBtnContainer>
          <PostBtn
            onClick={session.isLogin ? openPostBoardHandler : openAuthHandler}
          >
            {/* <FontAwesomeIcon id="pencil_icon" icon={faPencilAlt} /> */}
            <span>글 작성</span>
          </PostBtn>
        </PostBtnContainer>
      </Router>
    </>
  );
}
