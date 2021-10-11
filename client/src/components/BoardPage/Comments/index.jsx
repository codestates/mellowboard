import React from 'react';
import Comment from './Comment';
import { ModalView, ModalBackdrop } from './Modal';
import XButton from './XButton';

export default function Comments({ openModalHandler }) {
  return (
    <>
      <ModalBackdrop>
        <ModalView>
          <XButton onClick={openModalHandler} />
          <Comment />
        </ModalView>
      </ModalBackdrop>
    </>
  );
}
