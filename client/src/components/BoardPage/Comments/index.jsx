import React, { useState } from 'react';
import axios from 'axios';
import Comment from './Comment';
import { ModalView, ModalBackdrop } from './Modal';
import XButton from './XButton';
import WritingComment from './WritingComment';
import Wrapper from './Wrapper';

export default function Comments({
  openModalHandler,
  refreshHandler,
  comments,
  postId,
  isLogin,
  openAuthHandler,
}) {
  return (
    <>
      {/* <ModalBackdrop onClick={openModalHandler}> */}
      <ModalView onClick={(e) => e.stopPropagation()}>
        <XButton onClick={openModalHandler} />
        <WritingComment refreshHandler={refreshHandler} postId={postId} isLogin={isLogin} openAuthHandler={openAuthHandler} />
        <Wrapper>
          {comments.map((el) => (
            <Comment
              key={el.id}
              comment={el.comment}
              isMine={el.isMine}
              commentId={el.id}
              refreshHandler={refreshHandler}
              postId={postId}
            />
          ))}
        </Wrapper>
      </ModalView>
      {/* </ModalBackdrop> */}
    </>
  );
}
