const remove = {
  byId: async (id: number) => {
    try {
      const response = await fetch(`http://localhost:4000/api/recipes/${id}`, {
        method: 'DELETE',
        mode: 'cors',
      });
      return response.json();
    } catch (err) {
      console.log(err);
      return err;
    }
  },
};

export { remove };
