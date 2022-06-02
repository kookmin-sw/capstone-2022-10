import { JWT } from '../../types/etc';

const remove = {
  exit: async () => {
    try {
      await fetch(`${process.env.REACT_APP_SERVER_URL_LOCAL}/api/users`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          authorization: `Bearer ${localStorage.getItem(JWT)}`,
        },
      });
    } catch (err) {
      window.location.href = '/error';
    }
  },
};

export { remove };
