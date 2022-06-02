import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import Modal from 'react-modal';
import styled from 'styled-components';

import API from '../../api';
import { isModalOpenAtom, ingredientResultListAtom, formDataAtom, navButtonAtom, modalTypeAtom } from '../../state';
import { ModalType } from './type';
import { ImageType } from '../../types/enum';

type props = {
  isOpen: boolean;
};

const StatusMessage = '이미지 분석에 실패했습니다.';
const Notification = '※ 영수증 및 재료는 배경과 명확히 구분되어야 합니다.';
enum ButtonType {
  RECEIPT = '영수증 이미지',
  INGREDIENT = '재료 이미지',
}

const ImageOptionModal: React.FC<props> = ({ isOpen }) => {
  const navigate = useNavigate();
  const setIngredientResultList = useSetRecoilState<string[]>(ingredientResultListAtom);
  const setIsModalOpen = useSetRecoilState(isModalOpenAtom);
  const setModalType = useSetRecoilState(modalTypeAtom);
  const navButtonType = useRecoilValue(navButtonAtom);
  const [formData, setFormData] = useRecoilState<string | FormData>(formDataAtom);

  async function clickHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const imageType = e.currentTarget.className as ImageType;
    setModalType(ModalType.LOADING);
    setIsModalOpen(true);
    const result = await API.parseImage(imageType, formData);
    if (result === 'fail') {
      alert(StatusMessage);
    } else if (result!.charAt(1) === '"') {
      setIngredientResultList(result!.replace('"]', '').replace('["', '').split('","'));
      navigate('/parseResult');
    } else {
      alert(StatusMessage);
      navigate('/');
    }
    setIsModalOpen(false);
    setFormData('');
  }

  return (
    <StyledModal isOpen={isOpen} onRequestClose={() => setIsModalOpen(false)} shouldCloseOnOverlayClick={false}>
      <Title> {navButtonType === 'camera' ? '카메라' : '업로드'} 옵션</Title>
      <Button className={ImageType.RECEIPT} onClick={clickHandler}>
        {ButtonType.RECEIPT}
      </Button>
      <Button className={ImageType.INGREDIENT} onClick={clickHandler}>
        {ButtonType.INGREDIENT}
      </Button>
      <Text>{Notification}</Text>
    </StyledModal>
  );
};

const StyledModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin: 10vh auto;
  width: 60vw;
  height: 21vh;
  height: 40vh;
`;

const Button = styled.button`
  margin: 3vh auto;
  padding: 10px 30px;
  border-radius: 10px;
  background-color: #ffd196;
`;

const Text = styled.div`
  width: 90%;
  padding: auto;
  margin: 5vh 0 5vh 0;
  text-align: center;
  color: red;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  width: 100%;
  margin: 15vh 0 10vh 0;
  text-align: center;
`;

export default ImageOptionModal;
