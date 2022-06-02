import { JWT } from '../../types/etc';

const read = {
  signinUserInfo: async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL_LOCAL}/api/users/base-dto`, {
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
  byId: async (id: number) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL_LOCAL}/api/users/${id}`, {
        method: 'GET',
        mode: 'cors',
      });
      return await response.json();
    } catch (err) {
      window.location.href = '/error';
    }
  },
  byNickname: async (nickname: string) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL_LOCAL}/api/users/search?nickname=${nickname}`, {
        method: 'GET',
        mode: 'cors',
      });
      return await response.json();
    } catch (err) {
      window.location.href = '/error';
    }
  },
  todayChef: async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL_LOCAL}/api/users/today-chef`, {
        method: 'GET',
        mode: 'cors',
      });
      const json = await response.json();
      return json;
    } catch (err) {
      window.location.href = '/error';
    }
  },
};

export { read };
