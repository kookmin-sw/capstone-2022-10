import { atom } from 'recoil';
import { BaseUserDTO, UpdateUserDTO } from '../types/user';

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

const updateUserAtom = atom({
  key: 'updateUserAtom',
  default: UpdateUserDTO.getEmptyUpdateUser(),
});

const ingredientResultListAtom = atom<string[]>({
  key: 'ingredientResultList',
  default: [],
});

const formDataAtom = atom<FormData | string>({
  key: 'formData',
  default: '',
});

const navButtonAtom = atom<string>({
  key: 'navButton',
  default: '',
});

const triggerAtom = atom<number>({
  key: 'trigger',
  default: 0,
});

export {
  signinUserAtom,
  isModalOpenAtom,
  modalTypeAtom,
  updateUserAtom,
  ingredientResultListAtom,
  formDataAtom,
  navButtonAtom,
  triggerAtom,
};
