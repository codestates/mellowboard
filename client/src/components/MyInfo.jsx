import React from 'react';
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

export default function MyInfo() {
  return (
    <>
      <MyInfoForm>
        <div id="my_id">aawerawerawer님의 정보</div>
        <div id="change_password_container">
          <label htmlFor="" id="change_password">
            변경하실 비밀번호
          </label>
          <input type="text" id="change_password_input" />
        </div>
        <div id="change_password_check_container">
          <label htmlFor="" id="change_password_check">
            변경하실 비밀번호 확인
          </label>
          <input type="text" id="change_password_check_input" />
        </div>
        <div id="change_email_container">
          <label htmlFor="" id="change_email">
            변경하실 이메일
          </label>
          <input type="text" id="change_email_input" />
        </div>
        <div id="change_email_container">
          <label htmlFor="" id="change_email_check">
            변경하실 이메일 확인
          </label>
          <input type="text" id="change_email_check_input" />
        </div>
        <div id="btn_container">
          <button id="withdrawal_btn">회원 탈퇴</button>
          <button id="modify_info_btn">정보 수정</button>
        </div>
      </MyInfoForm>
    </>
  );
}
