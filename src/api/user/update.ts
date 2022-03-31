import { UpdateUserDTO } from '../../types/user';

const update = {
  infomation: async (id: number, updateUser: UpdateUserDTO) => {
    try {
      const response = await fetch(`http://localhost:4000/api/users/${id}`, {
        method: 'PATCH',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 4,
          updateUserInfomation: {
            nickname: updateUser.nickname,
            loginPassword: updateUser.loginPassword,
            confirmPassword: updateUser.confirmPassword,
            description: updateUser.description,
          },
        }),
      });
      return response;
    } catch (err) {
      console.log(err);
      return err;
    }
  },
};

export { update };
