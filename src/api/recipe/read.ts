import { JWT } from '../../types/etc';

const read = {
  byId: async (recipeId: number) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL_LOCAL}/api/recipes/${recipeId}`, {
        mode: 'cors',
      });
      return await response.json();
    } catch (err) {
      window.location.href = '/error';
    }
  },

  byIngredient: async (ingredients: string[]) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL_LOCAL}/api/recipes/search`, {
        method: 'POST',
        body: JSON.stringify({ ingredients }),
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem(JWT)}`,
        },
        mode: 'cors',
      });
      return await response.json();
    } catch (err) {
      window.location.href = '/error';
    }
  },
  todayMostLiked: async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL_LOCAL}/api/recipes/today-most-liked`, {
        method: 'GET',
        mode: 'cors',
      });
      return await response.json();
    } catch (err) {
      window.location.href = '/error';
    }
  },
  subscribeChefLatest: async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL_LOCAL}/api/recipes/subscribe-chef-latest`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          authorization: `Bearer ${localStorage.getItem(JWT)}`,
        },
      });
      return await response.json();
    } catch (err) {
      window.location.href = '/error';
    }
  },
  recommendation: async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL_LOCAL}/api/recipes/recommendation`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          authorization: `Bearer ${localStorage.getItem(JWT)}`,
        },
      });
      return await response.json();
    } catch (err) {
      window.location.href = '/error';
    }
  },
  byTitle: async (title: string) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL_LOCAL}/api/recipes/search?title=${title}`, {
        method: 'GET',
        mode: 'cors',
      });
      return await response.json();
    } catch (err) {
      window.location.href = '/error';
    }
  },
  byTag: async (tag: string) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL_LOCAL}/api/recipe-tag/search?tag=${tag}`, {
        method: 'GET',
        mode: 'cors',
      });
      return await response.json();
    } catch (err) {
      window.location.href = '/error';
    }
  },
};

export { read };
