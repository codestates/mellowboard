import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../images/logo.png';

const NavContainer = styled.header`
  margin: 1rem;
  background-color: #263343;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #f5f6fa;
`;

const NavTitle = styled.span`
  margin-left: 1rem;
  display: flex;
  align-items: center;

  .logo {
    width: 3rem;
    height: 3rem;
    margin-right: 0.5rem;
  }
`;

const BtnContainer = styled.span`
  button {
    all: unset;
    cursor: pointer;
    margin-right: 2rem;
    font-size: 1.3rem;
  }
`;

export default function Nav({ openAuthHandler, isLogin }) {
  return (
    <>
      <NavContainer>
        <Link to="/" style={{ textDecoration: 'none', color: '#f5f6fa' }}>
          <NavTitle>
            <img className="logo" src={logo} alt="logo" />
            <h1>무르익게</h1>
          </NavTitle>
        </Link>
        <BtnContainer>
          {isLogin ? null : (
            <button id="login_btn" onClick={openAuthHandler}>
              로그인
            </button>
          )}
          {isLogin ? <button id="logout_btn">로그아웃</button> : null}
          <Link
            to="/mypage"
            style={{ textDecoration: 'none', color: '#f5f6fa' }}
          >
            {isLogin ? <button id="mypage_btn">마이페이지</button> : null}
          </Link>
        </BtnContainer>
      </NavContainer>
    </>
  );
}
