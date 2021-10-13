import React, { useCallback, useEffect, useState } from 'react';
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
import WriteButton from './WriteButton';
import LoadingPage from './components/LoadingPage';

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
  background-color: #6d214f;
  position: fixed;
  bottom: 3rem;
  color: #5758bb;

  #pencil_icon {
    font-size: 2rem;
  }
`;

export default function App() {
  const [session, setSession] = useState({
    accessToken: 'init',
    isLogin: false,
  });
  const [posts, setPosts] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const { scrollY } = useScroll();
  const [curPage, setCurPage] = useState(-1);
  const [total, setTotal] = useState(1);

  const addMyPostHandler = () => {
    axios
      .get('/posts/mypage')
      .then((res) => {
        setMyPosts(res.data.posts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const modifyPostHandler = async (post, content, background, tags) => {
    /**
     * 게시글을 수정하는 함수. 비동기로 작성
     * 서버에 요청을 보내고 state를 변경하고 결과를 Promise타입으로 리턴한다.
     * @return <Promise>
     */
    try {
      await axios.patch('/posts', {
        postId: post.id,
        content,
        background,
        tags,
      });
    } catch (err) {
      return Promise.reject(err);
    }
    const newPosts = posts.slice();
    const changedPostIndex = newPosts.findIndex((e) => e.id === post.id);
    newPosts[changedPostIndex] = {
      ...post,
      content,
      background,
      tags,
    };
    setPosts(newPosts);

    const myNewPosts = myPosts.slice();
    const changedMyPostIndex = myNewPosts.findIndex((e) => e.id === post.id);
    myNewPosts[changedMyPostIndex] = {
      ...post,
      content,
      background,
      tags,
    };
    setMyPosts(myNewPosts);

    return Promise.resolve(true);
  };

  const deletePostHandler = (postId) => {
    axios
      .delete('/posts', {
        data: { postId },
      })
      .then(() => {
        setPosts(posts.filter((post) => post.id !== postId));
      })
      .catch((err) => {
        console.log(err.response.data?.message);
      });
  };

  const deleteMyPostHandler = (postId) => {
    setMyPosts(myPosts.filter((post) => post.id !== postId));
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
      .get('/posts/mypage', {
        headers: { Authorization: `Bearer ${newToken}` },
      })
      .then((res) => {
        setMyPosts(res.data.posts);
      });
  }, []);

  useEffect(() => {
    /**
     * session이 변경되면 axios의 헤더값을 수정한다.
     */
    if (session.accessToken === 'init') return;
    axios.defaults.headers.common = {
      Authorization: `Bearer ${session.accessToken}`,
    };
    addPostHandler();
  }, [session]);

  useEffect(() => {
    // 페이지가 변경되면 실행한다.
    if (curPage === -1) return;
    const size = 100;
    if (curPage > total && curPage !== 1) {
      return;
    }

    axios.get('/posts', { params: { page: curPage, size } }).then((res) => {
      setTotal(res.data.pages.total);
      if (curPage === 1) {
        setPosts(res.data.posts);
      } else {
        // 글이 추가되는 등의 문제로 중복이 있을 수 있음
        // 중복 제거 시행
        const resData = res.data.posts.filter((post) => {
          const index = posts.findIndex(
            (originPost) => originPost.id === post.id
          );
          if (index === -1) return true;
          return false;
        });
        const newData = [...posts, ...resData];
        setPosts(newData);
      }
    });
  }, [curPage]);

  const addPostHandler = (more) => {
    if (!more) {
      if (curPage === 1) {
        axios.get('/posts', { params: { page: 1, size: 100 } }).then((res) => {
          setTotal(res.data.pages.total);
          setPosts(res.data.posts);
        });
      } else {
        setCurPage(1);
      }
    } else if (curPage < total) {
      setCurPage(curPage + 1);
    }
  };

  function importAll(r) {
    const images = {};
    r.keys().forEach((item) => {
      images[item.replace('./', '')] = r(item);
    });
    return images;
  }

  useEffect(() => {
    // 스크롤 이벤트
    if (scrollY + window.innerHeight >= document.body.offsetHeight - 200) {
      addPostHandler(true);
    }
  }, [scrollY]);

  useEffect(() => {
    /**
     * session이 변경되면 axios의 헤더값을 수정한다.
     */
    axios.defaults.headers.common = {
      Authorization: `Bearer ${session.accessToken}`,
    };

    addPostHandler();
  }, [session]);

  const images = importAll(
    require.context('./images/background', false, /\.(png|jpe?g|svg)$/)
  );

  function useScroll() {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
      let mounted = true;
      window.addEventListener('scroll', () => {
        if (mounted) {
          setScrollY(window.scrollY);
        }
      });
      return () => {
        mounted = false;
        // window.removeEventListener('scroll', scrollCallback);
      };
    });
    return {
      scrollY,
    };
  }

  return (
    <>
      {/* <LoadingPage /> */}
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
        addMyPostHandler={addMyPostHandler}
      />
      <GlobalStyle />
      <Router>
        <Nav
          openAuthHandler={openAuthHandler}
          session={session}
          handleSession={handleSession}
          addPostHandler={addPostHandler}
        />
        <Switch>
          <Route exact path="/">
            <BoardPage
              isLogin={session.isLogin}
              posts={posts}
              modifyPostHandler={modifyPostHandler}
              deletePostHandler={deletePostHandler}
              openAuthHandler={openAuthHandler}
              images={images}
              addPostHandler={addPostHandler}
            />
          </Route>
          <Route path="/mypage">
            {session.isLogin ? (
              <MyPage
                isLogin={session.isLogin}
                modifyPostHandler={modifyPostHandler}
                deletePostHandler={deletePostHandler}
                openAuthHandler={openAuthHandler}
                images={images}
                deleteMyPostHandler={deleteMyPostHandler}
                myPosts={myPosts}
              />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
        </Switch>
        <PostBtnContainer>
          <PostBtn
            onClick={session.isLogin ? openPostBoardHandler : openAuthHandler}
          >
            {/* <FontAwesomeIcon id="pencil_icon" icon={faPencilAlt} /> */}
            {/* <span>글 작성</span> */}
            <WriteButton />
          </PostBtn>
        </PostBtnContainer>
      </Router>
    </>
  );
}
