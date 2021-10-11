import React, { useState } from 'react';
import axios from 'axios';
import Comment from './Comment';
import { ModalView, ModalBackdrop } from './Modal';
import XButton from './XButton';
import WritingComment from './WritingComment';

export default function Comments({ openModalHandler, comments }) {
  consoleg.log(comments);
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
