import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import API from '../../api';
import { parseId } from '../../helper';
import { isModalOpenAtom } from '../../state';
import { StyledConfirmModal } from './style';

type props = {
  isOpen: boolean;
};

const ConfirmDeleteModal: React.FC<props> = ({ isOpen }) => {
  const setIsModalOpen = useSetRecoilState(isModalOpenAtom);
  const location = useLocation();
  const navigate = useNavigate();

  async function submit() {
    await API.Recipe.remove.byId(parseId(location.pathname));
    setIsModalOpen(false);
    navigate(-1);
  }
  function cancle() {
    setIsModalOpen(false);
  }

  return (
    <StyledConfirmModal isOpen={isOpen} onRequestClose={() => setIsModalOpen(false)} shouldCloseOnOverlayClick={false}>
      <div className="message">정말 삭제 하시겠습니까?</div>
      <button className="cancel" type="button" onClick={cancle}>
        아니오
      </button>
      <button className="submit" type="button" onClick={submit}>
        예
      </button>
    </StyledConfirmModal>
  );
};

export default ConfirmDeleteModal;
