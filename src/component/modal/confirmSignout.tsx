import React from 'react';
import Modal from 'react-modal';
import { useSetRecoilState } from 'recoil';
import { isModalOpenAtom } from '../../state';

type props = {
  isOpen: boolean;
};

const ConfirmSignoutModal: React.FC<props> = ({ isOpen }) => {
  const setIsModalOpen = useSetRecoilState(isModalOpenAtom);

  function cancle() {
    setIsModalOpen(false);
  }
  function submit() {
    localStorage.removeItem('JWT');
    setIsModalOpen(false);
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={() => setIsModalOpen(false)} shouldCloseOnOverlayClick={false}>
      <p>정말 로그아웃 하시겠습니까?</p>
      <button type="button" onClick={cancle}>
        아니오
      </button>
      <button type="button" onClick={submit}>
        예
      </button>
    </Modal>
  );
};

export default ConfirmSignoutModal;
