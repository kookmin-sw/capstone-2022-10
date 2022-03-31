import React from 'react';
import { useRecoilValue } from 'recoil';
import { isModalOpenAtom, modalTypeAtom } from '../../state';

import ConfirmSignoutModal from './confirmSignout';
import ConfirmDeleteModal from './confirmDelete';
import ConfirmExitModal from './confirmExit';
import ChangeUserModal from './changeUser';

import { ModalType } from './type';

const Modal: React.FC = () => {
  const isModalOpen = useRecoilValue(isModalOpenAtom);
  const modalType = useRecoilValue(modalTypeAtom);

  return (
    <>
      <ChangeUserModal isOpen={isModalOpen && modalType === ModalType.CHANGE_INFOMATION} />
      <ConfirmExitModal isOpen={isModalOpen && modalType === ModalType.CONFIRM_EXIT} />
      <ConfirmSignoutModal isOpen={isModalOpen && modalType === ModalType.CONFIRM_SIGNOUT} />
      <ConfirmDeleteModal isOpen={isModalOpen && modalType === ModalType.CONFIRM_DELETE} />
    </>
  );
};

export default Modal;
