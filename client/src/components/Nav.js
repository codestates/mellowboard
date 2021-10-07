import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.header`
  border: 3px solid navy;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const NavTitle = styled.span`
  display: flex;
  align-items: center;

  .logo {
    width: 3rem;
    height: 3rem;
  }
`;

const BtnContainer = styled.span``;

export default function Nav({}) {
  return (
    <>
      <NavContainer>
        <NavTitle>
          <img className="logo" src="../images/logo.png" alt="logo" />
          <h1>무르익게</h1>
        </NavTitle>
        <BtnContainer>
          <button>로그인</button>
          <button>로그아웃</button>
          <Link to="/">
            <button>게시판</button>
          </Link>
          <Link to="/mypage">
            <button>마이페이지</button>
          </Link>
        </BtnContainer>
      </NavContainer>
    </>
  );
}
