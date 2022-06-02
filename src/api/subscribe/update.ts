import { JWT } from '../../types/etc';
import statusCode from '../statuscode';

const update = {
  subscribe: async (id: number) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL_LOCAL}/api/subscribe`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem(JWT)}`,
        },
        body: JSON.stringify({
          starId: id,
        }),
      });
      const { status } = response;
      if (status === statusCode.User.NOT_FOUND) {
        alert('존재하지 않는 유저입니다');
      } else if (status === statusCode.Server.ERROR) {
        alert('서버 오류');
      }
      return await response.json();
    } catch (err) {
      window.location.href = '/error';
    }
  },
};

export { update };
