import React, { useState } from 'react';
import axios from 'axios';
import TextBox from './TextBox';
import Wrapper from './Wrapper';
import { CheckButton } from '../Comment/Button';

export default function WritingComment({ refreshHandler }) {
  const [comment, setComment] = useState('');
  const onChangeHandler = (event) => {
    setComment(event.target.value);
  };
  const writingCommentHandler = () => {
    axios({
      method: 'post',
      url: '/comments',
      data: {
        postId: 1,
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
    // if (event.code === 'Enter') {
    //   writingCommentHandler();
    //   setComment('');
    // }
  };
  return (
    <Wrapper>
      <TextBox value={comment} onChange={onChangeHandler} onKeyUp={enterHandler} />
      <CheckButton onClick={writingCommentHandler} />
    </Wrapper>
  );
}
