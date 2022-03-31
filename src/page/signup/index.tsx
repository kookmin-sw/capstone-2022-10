import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BaseUserDTO } from '../../types/user';

type props = {
  signinUser: BaseUserDTO;
};

const SignupPage: React.FC<props> = ({ signinUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (signinUser.id !== -1) {
      navigate('/');
    }
  }, []);

  return <>signup page</>;
};

export default SignupPage;
