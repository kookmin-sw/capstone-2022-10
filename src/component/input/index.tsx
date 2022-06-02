import React from 'react';

type props = {
  title: string;
  type: string;
  setValue: (value: string) => void;
  placeholder: string;
  errorMessage: string;
};

const Input: React.FC<props> = ({ title, type, setValue, placeholder = '값을 입력하세요', errorMessage = '' }) => {
  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.currentTarget.value);
  }

  return (
    <>
      <h5 className="입력 주제">{title}</h5>
      <input className="입력 창" type={type} placeholder={placeholder} onChange={changeHandler} />
      <span className="errormsg">{errorMessage}</span>
    </>
  );
};

export default Input;
