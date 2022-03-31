import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';

import ThumbnailBox from '../../component/thumbnailBox';

import API from '../../api';
import { parseId } from '../../helper';

import { ReadUserDetailDTO, BaseUserDTO } from '../../types/user';
import { isModalOpenAtom, modalTypeAtom, pageOwnerAtom } from '../../state';
import { ModalType } from '../../component/modal/type';

type props = {
  signinUser: BaseUserDTO;
};

const UserDetail: React.FC<props> = ({ signinUser }) => {
  const [pageOwner, setPageOwner] = useRecoilState<ReadUserDetailDTO>(pageOwnerAtom);
  const [isMyPage, setIsMyPage] = useState(false);
  const [isModalOpen, setIsModalOpen] = useRecoilState(isModalOpenAtom);
  const setModalType = useSetRecoilState(modalTypeAtom);
  const location = useLocation();

  const myRecipeBoxes = pageOwner.myRecipe.map((recipe) => <ThumbnailBox baseInfo={recipe} />);
  const likeRecipeBoxes = pageOwner.likeRecipe.map((recipe) => <ThumbnailBox baseInfo={recipe} />);
  const subscribingChefBoxes = pageOwner.subscribingUser.map((user) => <ThumbnailBox baseInfo={user} />);

  function clickModalHandler(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    setIsModalOpen(!isModalOpen);
    setModalType(event.currentTarget.id);
  }

  useEffect(() => {
    async function getPageOwner() {
      const findUser = await API.User.read.byId(parseId(location.pathname));
      setPageOwner(findUser);
      if (findUser.id === signinUser.id) {
        setIsMyPage(true);
      }
    }
    getPageOwner();
  }, []);

  return (
    <>
      <h1>{isMyPage ? '마이페이지' : `${pageOwner.nickname}`}</h1>
      <div className="썸네일 블록">
        <img src={pageOwner.thumbnailUrl} alt="으악 유저 썸네일이 없어요" />
        {isMyPage && <img className="마이페이지면 삭제 버튼" alt="삭제 버튼" />}
        {isMyPage && <img className="마이페이지면 등록 버튼" alt="등록 버튼" />}
      </div>
      <div className="쉐프 통계 데이터 블록">
        <span className="쉐프 등급">{pageOwner.grade}</span>
        <span className="구독자수">{pageOwner.numberOfSubscribers}</span>
        <span className="총 좋아요 수">{pageOwner.numberOfLikes}</span>
      </div>
      <div className="계정 정보">
        <span className="닉네임">{pageOwner.nickname}</span>
        <span className="소개글">{pageOwner.description}</span>
        <div className="버튼 박스">
          <button id={ModalType.CHANGE_INFOMATION} className="회원정보 변경 버튼" type="button" onClick={clickModalHandler}>
            회원정보 변경
          </button>
          <button id={ModalType.CONFIRM_EXIT} className="회원 탈퇴 버튼" type="button" onClick={clickModalHandler}>
            회원탈퇴
          </button>
        </div>
      </div>
      <div className="레시피 목록">
        <div className="내가 올린 레시피">{myRecipeBoxes}</div>
        <div className="내가 좋아하는 레시피">{likeRecipeBoxes}</div>
        <div className="내가 구독한 쉐프">{subscribingChefBoxes}</div>
      </div>
    </>
  );
};

export default UserDetail;
