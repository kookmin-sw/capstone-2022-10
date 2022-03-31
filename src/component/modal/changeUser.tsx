import React, { useRef, useState } from 'react';
import Modal from 'react-modal';
import { useLocation } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import API from '../../api';
import { parseId } from '../../helper';
import { isModalOpenAtom, pageOwnerAtom } from '../../state';
import { ReadUserDetailDTO, UpdateUserDTO } from '../../types/user';

type props = {
  isOpen: boolean;
};

enum StatusMessage {
  EMPTY = '필수 입력입니다!',
  PASSWORD_IS_TOO_SHORT = '비밀번호가 너무 짧습니다',
  PASSWORD_NOT_MATCH = '비밀번호가 일치하지 않습니다',
  SUCCESS = '변경되었습니다',
}

const ChangeUserModal: React.FC<props> = ({ isOpen }) => {
  const setIsModalOpen = useSetRecoilState(isModalOpenAtom);
  const [statusMessage, setStatusMessage] = useState('');
  const [pageOwner, setPageOwner] = useRecoilState<ReadUserDetailDTO>(pageOwnerAtom);
  const location = useLocation();

  const nicknameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  async function submit() {
    const nickname = nicknameRef.current!.value;
    const password = passwordRef.current!.value;
    const passwordConfirm = passwordConfirmRef.current!.value;
    const description = descriptionRef.current!.value;

    if (nickname === '') setStatusMessage(StatusMessage.EMPTY);
    else if (password === '' || passwordConfirm === '') setStatusMessage(StatusMessage.EMPTY);
    else if (password?.length < 8) setStatusMessage(StatusMessage.PASSWORD_IS_TOO_SHORT);
    else if (password !== passwordConfirm) setStatusMessage(StatusMessage.PASSWORD_NOT_MATCH);

    const updatedUserInfo = new UpdateUserDTO(nickname, password, passwordConfirm, description);
    await API.User.update.infomation(parseId(location.pathname), updatedUserInfo);

    setPageOwner(ReadUserDetailDTO.getUpdatedReadUserDetail({ ...pageOwner, ...updatedUserInfo }));
    setStatusMessage(StatusMessage.SUCCESS);
    setIsModalOpen(false);
  }

  function cancle() {
    setIsModalOpen(false);
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={() => cancle()} shouldCloseOnOverlayClick={false}>
      <label htmlFor="nickname" />
      <input ref={nicknameRef} id="nickname" placeholder="입력해주세요" />

      <label htmlFor="password" />
      <input ref={passwordRef} id="password" placeholder="입력해주세요" />

      <label htmlFor="confirmPassword" />
      <input ref={passwordConfirmRef} id="confirmPassword" placeholder="입력해주세요" />

      <label htmlFor="description" />
      <input ref={descriptionRef} id="description" placeholder="입력해주세요" />

      <span className="상태 확인 라인">{statusMessage}</span>

      <button type="button" onClick={cancle}>
        그만 둘래요
      </button>
      <button type="button" onClick={submit}>
        변경하기
      </button>
    </Modal>
  );
};

export default ChangeUserModal;
