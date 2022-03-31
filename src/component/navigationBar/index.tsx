import React from 'react';
import styled from 'styled-components';

const NavigationBar: React.FC = () => (
  <BackGround>
    <Button>
      <img src="image\icon\navBar\camera.png" height="40vw" width="40vw" alt="camera" />
      <span>재료 촬영</span>
    </Button>
    <Button>
      <img src="image\icon\navBar\imgUpload.png" height="40vw" width="40vw" alt="imgUpload" />
      <span>사진 업로드</span>
    </Button>
    <Button>
      <img src="image\icon\navBar\writeIng.png" height="40vw" width="40vw" alt="writeIng" />
      <span>재료 입력</span>
    </Button>
    <Button>
      <img src="image\icon\navBar\signIn.png" height="40vw" width="40vw" alt="signIn" />
      <span>로그인</span>
    </Button>
  </BackGround>
);

const BackGround = styled.div`
  // Mobile
  overflow: hidden;
  background-color: #ff9f1c;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 10%;
  box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.25);
  & > div {
    float: left;
    width: 25%;
    height: 100%;
    line-height: 90px;
    margin: 0 auto;
    align-items: center;
    text-align: center;
    vertical-align: middle;
  }

  @media screen and (min-width: 500px) {
    // PC
    height: 10%;
  }
`;
const Button = styled.div`
  display: grid;
  margin-left: 0;
  margin-right: 0;
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
  height: 30px;
`;

export default NavigationBar;
