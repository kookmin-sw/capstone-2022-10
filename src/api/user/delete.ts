const remove = {
  exit: async () => {
    try {
      const response = await fetch('http://localhost:4000/api/users', {
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
