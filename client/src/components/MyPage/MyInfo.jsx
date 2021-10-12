import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const MyInfoForm = styled.form`
  border: 3px solid gray;
  font-family: 'Noto Serif KR';
  font-size: 2rem;

  #change_password_container,
  #change_password_check_container,
  #change_email_container,
  #change_email_container {
    display: flex;
    justify-content: space-between;
  }
`;

export const ErrorMessage = styled.div`
  color: red;
  font-size: big;
  width: 100%;
`;

export default function MyInfo() {
  const [userInfo, setUserInfo] = useState({});
  const [userForm, setUserForm] = useState({
    password: '', password2: '', email: '', email2: '',
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
      axios.delete("/users").then(res => {
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
    const emailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
    if (userForm.email && (!emailRegExp.test(userForm.email))) {
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
      console.log(res.data);
      const msg = document.getElementById('errorMsg');
      msg.style.color = 'green';
      setErrorMsg('회원정보가 수정되었습니다.');
      setTimeout(() => {
        setErrorMsg('');
        msg.style.color = 'red';
      }, 4000);
    });
  };

  return (
    <>
      <MyInfoForm id="infoForm">
        <div id="my_id">{userInfo.account}님의 정보</div>
        <div id="change_password_container">
          <label htmlFor="" id="change_password">
            변경하실 비밀번호
          </label>
          <input type="password" name="password" value={userForm.password} onChange={handleForm} />
        </div>
        <div id="change_password_check_container">
          <label htmlFor="" id="change_password_check">
            변경하실 비밀번호 확인
          </label>
          <input type="password" name="password2" value={userForm.password2} onChange={handleForm} />
        </div>
        <div id="change_email_container">
          <label htmlFor="" id="change_email">
            변경하실 이메일
          </label>
          <input type="text" name="email" value={userForm.email} onChange={handleForm} />
        </div>
        <div id="change_email_container">
          <label htmlFor="" id="change_email_check">
            변경하실 이메일 확인
          </label>
          <input type="text" name='email2' value={userForm.email2} onChange={handleForm} />
        </div>
        <div id="btn_container">
          <button id="withdrawal_btn" onClick={deleteUser}>회원 탈퇴</button>
          <button id="modify_info_btn" onClick={changeUserInfo}>정보 수정</button>
          <ErrorMessage id="errorMsg">{errorMsg}</ErrorMessage>
        </div>
      </MyInfoForm>
    </>
  );
}
