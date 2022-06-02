import statusCode from '../statuscode';

async function isEmailDuplicated(email: string) {
  try {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL_LOCAL}/api/users/check-duplication`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (error) {
    window.location.href = '/error';
  }
}

async function signup(email: string, encPassword: string, encConfPassword: string) {
  try {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL_LOCAL}/api/users/signup`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        loginId: email,
        loginPassword: encPassword,
        confirmPassword: encConfPassword,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (error) {
    window.location.href = '/error';
  }
}

async function login(id: string, password: string) {
  try {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL_LOCAL}/api/users/login`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({ loginId: id, loginPassword: password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    switch (response.status) {
      case statusCode.User.NOT_FOUND:
        alert('존재하지 않는 계정입니다.');
        break;
      case statusCode.User.PASSWORD_NOT_MATCH:
        alert('비밀번호가 일치하지 않습니다');
        break;
      default:
        break;
    }
    return await response.json();
  } catch (error) {
    window.location.href = '/error';
  }
}

const Auth = {
  isEmailDuplicated,
  signup,
  login,
};

export { Auth };
