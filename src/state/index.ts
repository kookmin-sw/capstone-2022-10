import { atom } from 'recoil';
import { BaseUserDTO, ReadUserDetailDTO } from '../types/user';

const signinUserAtom = atom({
  key: 'signinUser',
  default: new BaseUserDTO(),
});

const isModalOpenAtom = atom({
  key: 'isModalOpenAtom',
  default: false,
});

const modalTypeAtom = atom({
  key: 'modalType',
  default: '',
});

const pageOwnerAtom = atom({
  key: 'pageOwnerAtom',
  default: ReadUserDetailDTO.getEmptyReadUserDetail(),
});

export { signinUserAtom, isModalOpenAtom, modalTypeAtom, pageOwnerAtom };
