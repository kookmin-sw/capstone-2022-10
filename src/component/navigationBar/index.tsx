import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';

import Modal from '../modal';
import { isModalOpenAtom, modalTypeAtom, formDataAtom, navButtonAtom } from '../../state';
import { ModalType } from '../modal/type';
import { ImagePath } from '../../static';

const NavigationBar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(isModalOpenAtom);
  const setModalType = useSetRecoilState(modalTypeAtom);
  const setNavButton = useSetRecoilState(navButtonAtom);
  const setFormData = useSetRecoilState(formDataAtom);

  function setModalHandler() {
    setModalType(ModalType.IMAGE_OPTION);
    setIsModalOpen(!isModalOpen);
  }

  const imageChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files.length !== 0) {
      setNavButton('uplaod');
      setModalHandler();
      const file = e.currentTarget.files[0];

      const formdata = new FormData();
      formdata.append('file', file);
      setFormData(formdata);
    }
    e.currentTarget.value = '';
  };

  return (
    <>
      <Modal />
      <StyledNav>
        <ImgButton className="이미지 옵션">
          <input accept="image/*, .txt" id="icon-button-file" type="file" capture="environment" onChange={imageChangeHandler} />
          <label htmlFor="icon-button-file">
            <StyledImg width="8vw" src={`${process.env.PUBLIC_URL}${ImagePath.Button.UPLOAD_IMAGE}`} alt="imgUpload" />
            <span>이미지 업로드</span>
          </label>
        </ImgButton>
        <StyledLink to="/parseResult">
          <StyledImg width="8vw" src={`${process.env.PUBLIC_URL}${ImagePath.Button.PENCIL}`} alt="ingWrite" />
          <span>재료 입력</span>
        </StyledLink>
      </StyledNav>
    </>
  );
};

const StyledNav = styled.nav`
  // Mobile
  overflow: hidden;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 8vh;
  background: #ff9f1c;
  box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  grid-template-columns: 1fr 1fr;
  @media all and (min-aspect-ratio: 400/650) {
    grid-template-columns: 1fr 1fr 1fr;
    img {
      width: 5vh;
    }
  }
`;

const StyledImg = styled.img`
  width: ${(props) => props.width};
  display: block;
  margin: auto;
`;

const StyledLink = styled(Link)`
  display: block;
  margin: auto;
  text-decoration: none;
  span {
    font-size: 10pt;
    color: white;
  }
`;

const ImgButton = styled.div`
  margin: auto;
  input {
    display: none;
  }
  span {
    font-size: 10pt;
    color: white;
    text-decoration: none;
  }
`;

export default NavigationBar;
