import React from 'react';
import Modal from 'react-modal';
import { useLocation } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import API from '../../api';
import { parseId } from '../../helper';
import { isModalOpenAtom } from '../../state';

type props = {
  isOpen: boolean;
};

const ConfirmDeleteModal: React.FC<props> = ({ isOpen }) => {
  const setIsModalOpen = useSetRecoilState(isModalOpenAtom);
  const location = useLocation();

  async function submit() {
    await API.Recipe.remove.byId(parseId(location.pathname));
    setIsModalOpen(false);
  }
  function cancle() {
    setIsModalOpen(false);
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={() => setIsModalOpen(false)} shouldCloseOnOverlayClick={false}>
      <p>정말 삭제 하시겠습니까?</p>
      <button type="button" onClick={cancle}>
        아니오
      </button>
      <button type="button" onClick={submit}>
        예
      </button>
    </Modal>
  );
};

export default ConfirmDeleteModal;
