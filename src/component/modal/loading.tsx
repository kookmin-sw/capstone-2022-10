import React from 'react';
import { useSetRecoilState } from 'recoil';
import { isModalOpenAtom } from '../../state';
import { ImagePath } from '../../static';
import { StyledLoadingModal } from './style';

type props = {
  isOpen: boolean;
};

const LoadingModal: React.FC<props> = ({ isOpen }) => {
  const setIsModalOpen = useSetRecoilState(isModalOpenAtom);

  return (
    <StyledLoadingModal isOpen={isOpen} onRequestClose={() => setIsModalOpen(false)} shouldCloseOnOverlayClick={false}>
      <div className="wait">
        <img src={`${ImagePath.Status.LOADING}`} alt="loading" />
      </div>
      <div className="message">분석중...</div>
    </StyledLoadingModal>
  );
};

export default LoadingModal;
