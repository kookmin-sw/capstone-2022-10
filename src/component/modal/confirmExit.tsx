import React from 'react';
import Modal from 'react-modal';
import { useSetRecoilState } from 'recoil';
import API from '../../api';
import { isModalOpenAtom } from '../../state';

type props = {
  isOpen: boolean;
};

const ConfirmExitModal: React.FC<props> = ({ isOpen }) => {
  const setIsModalOpen = useSetRecoilState(isModalOpenAtom);

  function cancle() {
    setIsModalOpen(false);
  }
  async function submit() {
    await API.User.remove.exit();
    setIsModalOpen(false);
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={() => setIsModalOpen(false)} shouldCloseOnOverlayClick={false}>
      <p>정말 탈퇴 하시겠습니까?</p>
      <button type="button" onClick={cancle}>
        아니오
      </button>
      <button type="button" onClick={submit}>
        예
      </button>
    </Modal>
  );
};

export default ConfirmExitModal;
