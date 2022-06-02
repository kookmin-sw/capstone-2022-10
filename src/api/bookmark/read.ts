import { JWT } from '../../types/etc';
import statusCode from '../statuscode';

const read = {
  checkBookmark: async (recipeId: number) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL_LOCAL}/api/bookmarks/check`, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({ recipeId }),
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem(JWT)}`,
        },
      });
      const { status } = response;
      if (status === statusCode.User.NOT_FOUND) {
        alert('로그인');
      } else if (status === statusCode.Server.ERROR) {
        alert('서버 에러');
      }
      return await response.json();
    } catch (err) {
      window.location.href = '/error';
    }
  },
};

export { read };
