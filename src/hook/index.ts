import { BaseUserDTO } from '../types/user';

const ID = 'id';
const NICKNAME = 'nickname';
const THUMBNAILURL = 'thumbnailUrl';

function useSigninUser() {
  function setSigninUser(newUserData: BaseUserDTO): void {
    sessionStorage.setItem(ID, String(newUserData.id));
    sessionStorage.setItem(NICKNAME, String(newUserData.nickname));
    sessionStorage.setItem(THUMBNAILURL, String(newUserData.thumbnailUrl));
  }

  function getSigninUser(): BaseUserDTO {
    return new BaseUserDTO(
      Number(sessionStorage.getItem(ID)) || -1,
      sessionStorage.getItem(NICKNAME) || '',
      sessionStorage.getItem(THUMBNAILURL) || '',
    );
  }

  return { getSigninUser, setSigninUser };
}

export { useSigninUser };
