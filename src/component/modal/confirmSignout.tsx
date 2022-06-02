import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { isModalOpenAtom } from '../../state';
import { StyledConfirmModal } from './style';

type props = {
  isOpen: boolean;
};

const ConfirmSignoutModal: React.FC<props> = ({ isOpen }) => {
  const setIsModalOpen = useSetRecoilState(isModalOpenAtom);
  const navigate = useNavigate();

  function cancle() {
    setIsModalOpen(false);
  }
  function submit() {
    localStorage.clear();
    sessionStorage.clear();
    setIsModalOpen(false);
    navigate('/');
  }

  return (
    <StyledConfirmModal isOpen={isOpen} onRequestClose={() => setIsModalOpen(false)} shouldCloseOnOverlayClick={false}>
      <div className="message">정말 로그아웃 하시겠습니까?</div>
      <button className="cancel" type="button" onClick={cancle}>
        아니오
      </button>
      <button className="submit" type="button" onClick={submit}>
        예
      </button>
    </StyledConfirmModal>
  );
};

export default ConfirmSignoutModal;
