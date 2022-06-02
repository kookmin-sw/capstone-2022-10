import { JWT } from '../../types/etc';
import statusCode from '../statuscode';

const remove = {
  byId: async (id: number) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL_LOCAL}/api/recipes/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem(JWT)}`,
        },
        mode: 'cors',
      });
      const { status } = response;
      if (status === statusCode.Recipe.NOT_FOUND) {
        alert('레시피가 없음');
      } else if (status === statusCode.User.NOT_FOUND) {
        alert('로그인 필요');
      } else if (status === statusCode.Server.ERROR) {
        alert('서버 오류');
      }
    } catch (err) {
      window.location.href = '/error';
    }
  },
};

export { remove };
