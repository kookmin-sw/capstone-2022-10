import styled from 'styled-components';

const StyledBlock = styled.div`
  div {
    margin: 10px auto;
    border-radius: 10px;
  }
  margin: 0 auto;
  text-align: center;

  .chefname {
    text-align: left;
  }

  .thumbnailBlock {
    position: relative;
    width: 24vw;
    height: 24vw;
    margin: 0 auto;
    margin-top: 3vh;
    background-color: #eeeeee;

    .thumbnail {
      border-radius: 10px;
      display: inline-block;
      width: 24vw;
      height: 24vw;
    }

    .button {
      position: absolute;
      width: 5vw;
      height: 5vw;
      border: none;
      color: rgba(0, 0, 0, 0);
    }

    input[type='file'] {
      position: absolute;
      width: 0;
      height: 0;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      border: 0;
    }

    .delete {
      top: 1vw;
      background: url(${process.env.PUBLIC_URL}/image/icon/edit/delete.png);
      background-size: cover;
    }

    .pencil {
      bottom: 1vw;
      background: url(${process.env.PUBLIC_URL}/image/icon/edit/pencil.png);
      background-size: cover;
    }
  }

  .chefDataBlock {
    display: grid;
    padding: 10px 15px;
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: repeat(2, 1fr);
    background-color: #eeeeee;
  }

  .accountInfo {
    display: grid;
    padding: 10px 15px;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: 2fr 3fr;
    background-color: #cbf3f0;
  }

  .buttonbox {
    width: 300px;
    margin: 0 auto;
    height: 10vh;
    button {
      margin: 0 15px;
      background: #2ec4b6;
      width: 120px;
      height: 30px;
      font-size: 15px;
      color: white;
      border: none;
      border-radius: 7px;
    }

    .withdraw {
      background: red;
    }
  }

  .td {
    margin: auto 0;
    text-align: left;
  }
`;

export { StyledBlock };

const SThumbnailSection = styled.div`
  width: 80vw;
  height: 66vw;
  background: #eeeeee;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  overflow: auto;
  margin: 3vh auto;
  margin-bottom: 7vh;
  padding: 10px;
  border-radius: 10px;
  scrollbar-color: black;
  div {
    margin: 3vw;
  }
`;

export { SThumbnailSection };

const Bookmark = styled.img`
  position: absolute;
  width: 11vw;
  right: 8vw;
  top: 3.7vh;
`;

export { Bookmark };
