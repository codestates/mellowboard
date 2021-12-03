/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import axios from 'axios';
import TextBox from './TextBox';
import Wrapper from './Wrapper';
import { CheckButton } from '../Comment/Button';

export default function WritingComment({ refreshHandler, postId, isLogin, openAuthHandler }) {
  const [comment, setComment] = useState('');
  const onChangeHandler = (event) => {
    setComment(event.target.value);
  };
  const writingCommentHandler = () => {
    axios({
      method: 'post',
      url: '/comments',
      data: {
        postId,
        comment,
      },
    })
      .then(() => {
        refreshHandler();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const enterHandler = (event) => {
    /**
     * 엔터가 눌리면 댓글을 작성한다.
     */
    if (event.code === 'Enter') {
      if (isLogin) {
        writingCommentHandler();
        setComment('');
      } else {
        openAuthHandler();
      }
    }
  };
  return (
    <Wrapper>
      {isLogin ?
        <TextBox
          value={comment}
          onChange={onChangeHandler}
          onKeyUp={enterHandler}
        />
        :
        <TextBox
          value={comment}
          placeholder="로그인 이후 댓글을 작성할 수 있습니다."
          onChange={onChangeHandler}
          onKeyUp={enterHandler}
        />
      }
      <CheckButton onClick={isLogin ? writingCommentHandler : openAuthHandler} />
    </Wrapper>
  );
}
