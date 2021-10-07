import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <>
      <div id="nav-body">
        <span id="title">
          <span id="name">무르익게</span>
        </span>
        <div id="menu">
          <Link to="/">게시판</Link>
          <Link to="/mypage">주문내역</Link>
        </div>
      </div>
    </>
  );
};

export default Nav;
