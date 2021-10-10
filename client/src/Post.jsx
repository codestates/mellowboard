import React, { useState } from 'react';
import styled from 'styled-components';
import PostBackground from './images/background/01.png';
import Comments from './Comments';

const PostList = styled.li`
  background: url(${PostBackground}) center center / cover no-repeat;
  border: 3px solid blue;
  width: 50%;
  margin: 1rem -2.3rem;
  display: flex;
  flex-direction: column;

  :nth-child(2n) {
    margin-left: 3.6rem;
  }

  #top_btns {
    display: flex;
    justify-content: space-between;
  }

  #background_btn {
    margin-left: 43%;
    margin-top: 1rem;
    width: 5rem;
    cursor: pointer;
  }

  #close_btn {
    height: 1.5rem;
    cursor: pointer;
  }

  #hash_tags {
    border: 3px solid black;
    margin: 1rem;
  }

  .hash_tag {
    border: 3px solid purple;
    margin-left: 0.5rem;
  }

  #comments_cnt {
    margin: 1rem;
    border: 3px solid red;
    width: 4rem;
    cursor: pointer;
  }

  #comments_btns {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  #btn_container {
    margin-right: 1rem;
  }
`;

const PostText = styled.p`
  margin: 3rem 5rem;
  border: 3px solid green;
  font-family: 'Noto Serif KR';
  font-size: 1.5rem;
`;

const TextArea = styled.textarea`
  margin: 3rem 5rem;
  border: 3px solid green;
  font-family: 'Noto Serif KR';
  font-size: 1.5rem;
  height: 9rem;
  opacity: 0.4;
`;

const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: grid;
  place-items: center;
`;

const ModalView = styled.div.attrs((props) => ({
  role: 'dialog',
}))`
  border-radius: 1rem;
  background-color: white;
  width: 30rem;

  > button.close_btn {
    margin-left: 50%;
    cursor: pointer;
  }
`;

export default function Post() {
  const [isOpen, setIsOpen] = useState(false);
  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <PostList>
        <PostText>
          사랑과 가슴속에 이네들은 이 헤일 강아지, 부끄러운 봅니다. 하나의
          비둘기, 하나에 봄이 책상을 동경과 별 어머니, 봅니다. 딴은 이제 별에도
          이름자를 까닭입니다. 이름과, 시와 별빛이 한 북간도에 소학교
          버리었습니다. 다하지 별이 내린 이름자를 하나에 추억과 쓸쓸함과 것은
          거외다. 그러나 한 내 어머니 이런 시와 지나가는 아무 봅니다. 없이
          어머님, 강아지, 부끄러운 별 어머님, 그러나 까닭입니다. 책상을
          까닭이요, 별이 하나에 봄이 이름을 아름다운 별 까닭입니다. 아이들의
          시인의 당신은 가을로 계십니다. 하나에 사람들의 별이 계십니다.
        </PostText>
        <div id="hash_tags">
          <span className="hash_tag"># hash</span>
          <span className="hash_tag"># tag</span>
        </div>
        <span id="comments_cnt">댓글 n개</span>
      </PostList>
      <PostList>
        <PostText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl
          tincidunt eget nullam non. Quis hendrerit dolor magna eget est lorem
          ipsum dolor sit. Volutpat odio facilisis mauris sit amet massa.
          Commodo odio aenean sed adipiscing diam donec adipiscing tristique. Mi
          eget mauris pharetra et. Non tellus orci ac auctor augue. Elit at
          imperdiet dui accumsan sit. Ornare arcu dui vivamus arcu felis.
          Egestas integer eget aliquet nibh praesent. In hac habitasse platea
          dictumst quisque sagittis purus. Pulvinar elementum integer enim neque
          volutpat ac.
        </PostText>
        <div id="hash_tags">
          <span className="hash_tag"># hash</span>
          <span className="hash_tag"># tag</span>
        </div>
        <span id="comments_cnt">댓글 n개</span>
      </PostList>
      <PostList>
        <PostText>
          대통령은 법률이 정하는 바에 의하여 훈장 기타의 영전을 수여한다.
          헌법재판소에서 법률의 위헌결정, 탄핵의 결정, 정당해산의 결정 또는
          헌법소원에 관한 인용결정을 할 때에는 재판관 6인 이상의 찬성이 있어야
          한다. 모든 국민은 소급입법에 의하여 참정권의 제한을 받거나 재산권을
          박탈당하지 아니한다. 국가는 지역간의 균형있는 발전을 위하여 지역경제를
          육성할 의무를 진다. 모든 국민은 양심의 자유를 가진다. 법률안에 이의가
          있을 때에는 대통령은 제1항의 기간내에 이의서를 붙여 국회로 환부하고,
          그 재의를 요구할 수 있다. 국회의 폐회중에도 또한 같다. 법관은 탄핵
          또는 금고 이상의 형의 선고에 의하지 아니하고는 파면되지 아니하며,
          징계처분에 의하지 아니하고는 정직·감봉 기타 불리한 처분을 받지
          아니한다.
        </PostText>
        <div id="hash_tags">
          <span className="hash_tag"># hash</span>
          <span className="hash_tag"># tag</span>
        </div>
        <div id="comments_btns">
          <span id="comments_cnt">댓글 n개</span>
          <span id="btn_container">
            <button id="modify_btn">수정</button>
            <button id="delete_btn">삭제</button>
          </span>
        </div>
      </PostList>
      <PostList>
        <div id="top_btns">
          <button id="background_btn">배경 선택</button>
          <button id="close_btn">&times;</button>
        </div>
        <TextArea></TextArea>
        <div id="hash_tags">
          <input className="input_hash_tag" value="#" placeholder="#"></input>
          <input className="input_hash_tag" placeholder="#"></input>
        </div>
        <div id="comments_btns">
          <span id="comments_cnt" onClick={openModalHandler}>
            댓글 n개
          </span>
          {isOpen === true ? (
            <ModalBackdrop>
              <ModalView>
                <button className="close_btn" onClick={openModalHandler}>
                  &times;
                </button>
                <Comments />
              </ModalView>
            </ModalBackdrop>
          ) : null}
          <span id="btn_container">
            <button id="modify_btn">확인</button>
            <button id="delete_btn">삭제</button>
          </span>
        </div>
      </PostList>
      <PostList>
        <PostText>
          정당은 법률이 정하는 바에 의하여 국가의 보호를 받으며, 국가는 법률이
          정하는 바에 의하여 정당운영에 필요한 자금을 보조할 수 있다.
          헌법재판소의 장은 국회의 동의를 얻어 재판관중에서 대통령이 임명한다.
        </PostText>
      </PostList>
      <PostList>
        <PostText>
          국토와 자원은 국가의 보호를 받으며, 국가는 그 균형있는 개발과 이용을
          위하여 필요한 계획을 수립한다. 대통령은 제1항과 제2항의 처분 또는
          명령을 한 때에는 지체없이 국회에 보고하여 그 승인을 얻어야 한다.
          헌법재판소에서 법률의 위헌결정, 탄핵의 결정, 정당해산의 결정 또는
          헌법소원에 관한 인용결정을 할 때에는 재판관 6인 이상의 찬성이 있어야
          한다. 비상계엄이 선포된 때에는 법률이 정하는 바에 의하여 영장제도,
          언론·출판·집회·결사의 자유, 정부나 법원의 권한에 관하여 특별한 조치를
          할 수 있다. 국가는 주택개발정책등을 통하여 모든 국민이 쾌적한
          주거생활을 할 수 있도록 노력하여야 한다.
        </PostText>
      </PostList>
    </>
  );
}
