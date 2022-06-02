import { JWT } from '../../types/etc';
import statusCode from '../statuscode';

const read = {
  hasSubscribed: async (chefId: number) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL_LOCAL}/api/subscribe/${chefId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem(JWT)}`,
        },
        mode: 'cors',
      });

      const { status } = response;
      if (status === statusCode.User.NOT_FOUND) {
        alert('로그인 필요 / 존재하지 않는 유저');
      } else if (status === statusCode.Server.ERROR) {
        alert('서버 오류');
      }
      return await response.json();
    } catch (err) {
      window.location.href = '/error';
    }
  },
};

export { read };
