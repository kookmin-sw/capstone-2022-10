import { JWT } from '../../types/etc';
import { UpdateUserDTO } from '../../types/user';
import statusCode from '../statuscode';

const update = {
  infomation: async (updateUser: UpdateUserDTO) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL_LOCAL}/api/users`, {
        method: 'PATCH',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem(JWT)}`,
        },
        body: JSON.stringify({
          userId: 4,
          updateUserInfomation: {
            nickname: updateUser.nickname,
            loginPassword: updateUser.loginPassword,
            confirmPassword: updateUser.confirmPassword,
            description: updateUser.description,
          },
        }),
      });
      return response;
    } catch (err) {
      window.location.href = '/error';
    }
  },
  thumbnail: async (thumbnailUrl: string) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL_LOCAL}/api/users/thumbnail`, {
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify({ thumbnailUrl }),
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem(JWT)}`,
        },
      });

      const { status } = response;

      if (status === statusCode.User.NOT_FOUND) {
        alert('로그인 필요');
      } else if (status === statusCode.User.NOT_AUTHORIZED) {
        alert('로그인 필요');
      } else if (status === statusCode.Server.ERROR) {
        alert('서버 애러');
      }
    } catch (err) {
      window.location.href = '/error';
    }
  },
};

export { update };
