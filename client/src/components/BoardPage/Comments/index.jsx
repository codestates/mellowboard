import React, { useState } from 'react';
import axios from 'axios';
import Comment from './Comment';
import { ModalView, ModalBackdrop } from './Modal';
import XButton from './XButton';
import WritingComment from './WritingComment';

export default function Comments({ openModalHandler }) {
  const url = `${process.env.REACT_APP_API_URL}/comments`;
  const [comments, setComments] = useState([]);
  axios({
    method: 'get',
    url,
    params: {
      postId: 1,
    },
  })
    .then((res) => {
      setComments(res.data.comments);
    })
    .catch((err) => {
      console.log(err);
    });
  return (
    <>
      <ModalBackdrop>
        <ModalView>
          <XButton onClick={openModalHandler} />
          <WritingComment />
          {comments.map((el) => (
            <Comment comment={el.comment} isMine={el.isMine} />
          ))}
        </ModalView>
      </ModalBackdrop>
    </>
  );
}
