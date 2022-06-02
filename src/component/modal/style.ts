import styled from 'styled-components';
import Modal from 'react-modal';

const StyledChangeUserModal = styled(Modal)`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 2fr 1.5fr 1.5fr;
  margin: 20vh auto;
  width: 60vw;
  height: 60vh;
  background: #cbf3f0;
  border-radius: 10px;

  label {
    font-weight: 600;
    padding: 2vh;
    text-align: center;
  }

  .input {
    width: 35vw;
    margin: 0 auto;
    border: 0px solid black;
    padding: 1px 10px;
    height: 3.5vh;
    border-radius: 5px;
    box-shadow: 0 3px 3px rgb(173, 173, 173, 0.6) inset;
  }

  #description {
    line-height: 3.5vh;
    height: 10vh;
  }

  .statusMessage {
    color: red;
    font-size: 2.5vw;
    text-align: center;
    line-height: 3vw;
    width: 35vw;
    margin: 1vh auto;
  }

  .buttonSection {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 2vw;
    button {
      display: block;
      width: 25vw;
      height: 10vw;
      border: none;
      border-radius: 7px;
      background: #2ec4b6;
      color: white;
    }

    .cancle {
      background: #cacaca;
      margin-left: 4vw;
    }
  }
`;
export { StyledChangeUserModal };

const StyledConfirmModal = styled(Modal)`
  position: relative;
  margin: 30vh auto;
  width: 60vw;
  height: 21vh;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;

  .message {
    position: absolute;
    top: 6vh;
    left: 15vw;
    line-height: 3vh;
    width: 30vw;
    text-align: center;
  }

  button {
    position: absolute;
    bottom: 3vh;
    width: 19vw;
    border: none;
    height: 3.5vh;
    border-radius: 5px;
    color: white;
  }

  .cancel {
    left: 8vw;
    background: #cacaca;
  }

  .submit {
    right: 8vw;
    background: red;
  }
`;

export { StyledConfirmModal };

const StyledLoadingModal = styled(Modal)`
  position: relative;
  margin: 30vh auto;
  width: 60vw;
  height: 21vh;
  background: rgba(f, f, f, 0.1);
  border-radius: 10px;
  box-shadow: 0px 5px 10px #adadad;

  .wait {
    position: absolute;
    top: 3vh;
    left: 15vw;
    line-height: 3vh;
    width: 30vw;
    text-align: center;
  }
  .message {
    position: absolute;
    bottom: 3vh;
    left: 15vw;
    line-height: 3vh;
    width: 30vw;
    text-align: center;
    font-size: 20px;
  }
`;

export { StyledLoadingModal };
