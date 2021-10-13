import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const MyInfoForm = styled.form`
  font-family: 'Noto Serif KR';
  font-size: 1.5rem;
  background-color: #cb883c63;
  box-shadow: 0 0.9rem 1.7rem rgba(0, 0, 0, 0),
    0 0.7rem 0.7rem rgba(0, 0, 0, 0.22);
  border-radius: 20px;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 768px) {
  }

  .change_password,
  .change_email {
    display: flex;
    justify-content: space-between;
    padding: 1rem 1rem 1rem 1rem;
    flex-direction: column;
  }

  input {
    height: 2rem;
    border-radius: 5px;
    padding-right: 10rem;
  }

  label {
    margin-bottom: 1rem;
  }

  #withdrawal_btn {
    background-color: #e55039;
    margin-right: 1rem;
  }

  #withdrawal_btn:hover {
    background-color: #eb2f06;
  }

  #modify_info_btn {
    background-color: #38ada9;
  }

  #modify_info_btn:hover {
    background-color: #0a3d62;
  }
`;

const Button = styled.button`
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  border-radius: 0.5rem;
`;

export const ErrorMessage = styled.div`
  color: #8e2305;
  background-color: #9370478f;

  font-size: big;
  width: 100%;
`;

export default function MyInfo() {
  const [userInfo, setUserInfo] = useState({});
  const [userForm, setUserForm] = useState({
    password: '',
    password2: '',
    email: '',
    email2: '',
  });
  const [errorMsg, setErrorMsg] = useState('');

  const handleForm = (event) => {
    setUserForm({
      ...userForm,
      [event.target.name]: event.target.value,
    });
    setErrorMsg('');
  };

  useEffect(() => {
    // 회원정보를 가져온다.
    axios.get('/users').then((res) => {
      setUserInfo(res.data);
    });
  }, []);

  const deleteUser = (e) => {
    e.preventDefault();
    if (window.confirm('정말로 탈퇴하시겠습니까?')) {
      axios.delete('/users').then((res) => {
        window.location.reload();
      });
    }
  };

  const changeUserInfo = (e) => {
    e.preventDefault();
    const form = document.getElementById('infoForm');
    // 유효성 검사
    if (!userForm.password && !userForm.email) {
      setErrorMsg('변경할 정보를 입력해주세요.');
      return;
    }

    if (userForm.password && userForm.password.length < 8) {
      form.password.focus();
      setErrorMsg('비밀번호 자릿수는 8자 이상 입력해주세요.');
      return;
    }
    if (userForm.password !== userForm.password2) {
      form.password2.focus();
      setErrorMsg('비밀번호를 똑같이 입력해주세요.');
      return;
    }
    const emailRegExp =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
    if (userForm.email && !emailRegExp.test(userForm.email)) {
      form.email.focus();
      setErrorMsg('올바른 이메일을 입력해주세요.');
      return;
    }
    if (userForm.email !== userForm.email2) {
      form.email.focus();
      setErrorMsg('이메일을 똑같이 입력해주세요.');
      return;
    }

    axios.patch('/users', userForm).then((res) => {
      const msg = document.getElementById('errorMsg');
      msg.style.color = 'green';
      setErrorMsg('회원정보가 수정되었습니다.');
      setUserForm({
        password: '',
        password2: '',
        email: '',
        email2: '',
      });
      setTimeout(() => {
        setErrorMsg('');
        msg.style.color = '#8e2305';
      }, 4000);
    });
  };

  return (
    <>
      <MyInfoForm id="infoForm">
        <h3>{userInfo.account}님의 정보</h3>
        <div className="change_password">
          <label>변경하실 비밀번호</label>
          <input
            type="password"
            name="password"
            value={userForm.password}
            onChange={handleForm}
          />
        </div>

        <div className="change_password">
          <label htmlFor="" id="change_password_check">
            변경하실 비밀번호 확인
          </label>
          <input
            type="password"
            name="password2"
            value={userForm.password2}
            onChange={handleForm}
          />
        </div>

        <div className="change_email">
          <label htmlFor="" id="change_email">
            변경하실 이메일
          </label>
          <input
            type="text"
            name="email"
            value={userForm.email}
            onChange={handleForm}
          />
        </div>

        <div className="change_email">
          <label htmlFor="" id="change_email_check">
            변경하실 이메일 확인
          </label>
          <input
            type="text"
            name="email2"
            value={userForm.email2}
            onChange={handleForm}
          />
        </div>
        <div id="btn_container">
          <Button id="withdrawal_btn" onClick={deleteUser}>
            회원 탈퇴
          </Button>
          <Button id="modify_info_btn" onClick={changeUserInfo}>
            정보 수정
          </Button>
          <ErrorMessage id="errorMsg">{errorMsg}</ErrorMessage>
        </div>
      </MyInfoForm>
    </>
  );
}
