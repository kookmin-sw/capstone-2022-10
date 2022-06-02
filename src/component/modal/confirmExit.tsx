import React from 'react';
import { useNavigate } from 'react-router';
import { useSetRecoilState } from 'recoil';
import API from '../../api';
import { isModalOpenAtom } from '../../state';
import { StyledConfirmModal } from './style';

type props = {
  isOpen: boolean;
};

const ConfirmExitModal: React.FC<props> = ({ isOpen }) => {
  const setIsModalOpen = useSetRecoilState(isModalOpenAtom);
  const navigate = useNavigate();

  function cancle() {
    setIsModalOpen(false);
  }
  async function submit() {
    navigate('/');
    await API.User.remove.exit();
    localStorage.clear();
    sessionStorage.clear();
    setIsModalOpen(false);
  }

  return (
    <StyledConfirmModal isOpen={isOpen} onRequestClose={() => setIsModalOpen(false)} shouldCloseOnOverlayClick={false}>
      <div className="message">
        정말 탈퇴
        <br />
        하시겠습니까?
      </div>
      <button className="cancel" type="button" onClick={cancle}>
        아니오
      </button>
      <button className="submit" type="button" onClick={submit}>
        예
      </button>
    </StyledConfirmModal>
  );
};

export default ConfirmExitModal;
