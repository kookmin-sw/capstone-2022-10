const read = {
  todayMostLiked: async () => {
    try {
      const response = await fetch('http://localhost:4000/api/recipes/today-most-liked', {
        method: 'GET',
        mode: 'cors',
      });
      return await response.json();
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  subscribeChefLatest: async () => {
    try {
      const response = await fetch('http://localhost:4000/api/recipes/subscribe-chef-latest', {
        method: 'GET',
        mode: 'cors',
      });
      const json = await response.json();
      return json;
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  recommendation: async () => {
    const response = await fetch('http://localhost:4000/api/recipes/recommendation', {
      method: 'GET',
      mode: 'cors',
    });
    const json = await response.json();
    return json;
  },
};

export { read };
