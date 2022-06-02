import { JWT } from '../../types/etc';
import { CreateRecipeDTO } from '../../types/recipe';
import statusCode from '../statuscode';

const create = {
  newRecipe: async (newRecipe: CreateRecipeDTO) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL_LOCAL}/api/recipes`, {
        method: 'POST',
        body: JSON.stringify({ recipe: newRecipe }),
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem(JWT)}`,
        },
        mode: 'cors',
      });
      const { status } = response;
      if (status === statusCode.User.NOT_FOUND) {
        alert('로그인');
      } else if (status === statusCode.Server.ERROR) {
        alert('서버');
      }
      return await response.json();
    } catch (err) {
      window.location.href = '/error';
    }
  },
};

export { create };
