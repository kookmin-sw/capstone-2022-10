const read = {
  byId: async (id: number) => {
    try {
      const response = await fetch(`http://localhost:4000/api/users/${id}`, {
        method: 'GET',
        mode: 'cors',
      });
      return await response.json();
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  todayChef: async () => {
    try {
      const response = await fetch('http://localhost:4000/api/users/today-chef', {
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
};

export { read };
