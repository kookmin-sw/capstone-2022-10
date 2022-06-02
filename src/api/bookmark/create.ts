import { JWT } from '../../types/etc';
import statusCode from '../statuscode';

const create = {
  bookmark: async (recipeId: number) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL_LOCAL}/api/bookmarks`, {
        method: 'POST',
        body: JSON.stringify({ recipeId }),
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem(JWT)}`,
        },
        mode: 'cors',
      });
      const { status } = response;
      if (status === statusCode.User.NOT_FOUND) {
        alert('로그인이 필요합니다');
      } else if (status === statusCode.Recipe.NOT_FOUND) {
        alert('존재하지 않는 레시피입니다');
      } else if (status === statusCode.Server.ERROR) {
        alert('서버 오류');
      }
    } catch (err) {
      window.location.href = '/error';
    }
  },
};

export { create };
