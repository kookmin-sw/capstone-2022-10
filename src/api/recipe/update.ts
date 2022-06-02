import { JWT } from '../../types/etc';
import { CreateRecipeDTO } from '../../types/recipe';
import statusCode from '../statuscode';

const update = async (id: number, updatedRecipe: CreateRecipeDTO) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL_LOCAL}/api/recipes/${id}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem(JWT)}`,
      },
      body: JSON.stringify({ recipe: updatedRecipe }),
    });
    const { status } = response;
    if (status === statusCode.Recipe.NOT_FOUND) {
      alert('존재하지 않는 레시피');
    } else if (status === statusCode.User.NOT_AUTHORIZED) {
      alert('로그인 필요');
    } else if (status === statusCode.Server.ERROR) {
      alert('서버 오류');
    }
  } catch (err) {
    window.location.href = '/error';
  }
};

export { update };
