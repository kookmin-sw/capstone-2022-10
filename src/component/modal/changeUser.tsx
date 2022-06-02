import React, { useRef, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import API from '../../api';
import { isModalOpenAtom, triggerAtom, updateUserAtom } from '../../state';
import { UpdateUserDTO } from '../../types/user';
import { StyledChangeUserModal } from './style';

type props = {
  isOpen: boolean;
};

enum StatusMessage {
  EMPTY = '닉네임, 비밀번호를 입력해 주세요',
  PASSWORD_IS_TOO_SHORT = '비밀번호가 너무 짧습니다',
  PASSWORD_NOT_MATCH = '비밀번호가 일치하지 않습니다',
}

const ChangeUserModal: React.FC<props> = ({ isOpen }) => {
  const setIsModalOpen = useSetRecoilState(isModalOpenAtom);
  const [statusMessage, setStatusMessage] = useState('');
  const [trigger, setTrigger] = useRecoilState(triggerAtom);
  const pageOwner = useRecoilValue<UpdateUserDTO>(updateUserAtom);

  const nicknameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  async function submit() {
    let isValid = true;
    const nickname = nicknameRef.current!.value;
    const password = passwordRef.current!.value;
    const passwordConfirm = passwordConfirmRef.current!.value;
    const description = descriptionRef.current!.value;

    if (nickname === '') {
      setStatusMessage(StatusMessage.EMPTY);
      isValid = false;
    } else if (password === '' || passwordConfirm === '') {
      setStatusMessage(StatusMessage.EMPTY);
      isValid = false;
    } else if (password?.length < 8) {
      setStatusMessage(StatusMessage.PASSWORD_IS_TOO_SHORT);
      isValid = false;
    } else if (password !== passwordConfirm) {
      setStatusMessage(StatusMessage.PASSWORD_NOT_MATCH);
      isValid = false;
    }

    if (!isValid) return;

    const updatedUserInfo = new UpdateUserDTO(nickname, password, passwordConfirm, description);
    await API.User.update.infomation(updatedUserInfo);
    setIsModalOpen(false);
    setTrigger(trigger + 1);
  }

  function cancle() {
    setStatusMessage('');
    setIsModalOpen(false);
  }

  return (
    <StyledChangeUserModal isOpen={isOpen} onRequestClose={() => cancle()} shouldCloseOnOverlayClick={false}>
      <label htmlFor="nickname">닉네임</label>
      <input className="input" ref={nicknameRef} id="nickname" placeholder={pageOwner.nickname} />

      <label htmlFor="password">비밀번호</label>
      <input className="input" type="password" ref={passwordRef} id="password" placeholder="입력해주세요" />

      <label htmlFor="confirmPassword">비밀번호 확인</label>
      <input className="input" type="password" ref={passwordConfirmRef} id="confirmPassword" placeholder="입력해주세요" />

      <label htmlFor="description">소개글</label>
      <textarea className="input" ref={descriptionRef} id="description" placeholder={pageOwner.description} />

      <div className="statusMessage">{statusMessage}</div>

      <div className="buttonSection">
        <button type="button" className="cancle" onClick={cancle}>
          그만 둘래요
        </button>
        <button type="button" className="submit" onClick={submit}>
          변경하기
        </button>
      </div>
    </StyledChangeUserModal>
  );
};

export default ChangeUserModal;
