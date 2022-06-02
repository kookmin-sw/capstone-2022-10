import React from 'react';
import styled from 'styled-components';
import AWS from 'aws-sdk';

import { getNewKey, getNewUrl } from '../../../helper';

import { Mode } from '../type';
import API from '../../../api';

type props = {
  mode: Mode;
  s3: AWS.S3;
  thumbnailUrl: string;
  setThumbnailUrl: React.Dispatch<React.SetStateAction<string>>;
};

const StyldThumbnailBox = styled.div`
  img {
    width : 80vw;
    border-radius : 10px;
  }
  margin-bottom : 2vw;

  .wrap {
    display : grid;
    grid-template-columns : 1fr 5vw;

    button {
      color : rgba(0, 0, 0, 0);
      border : none;
      width : 5vw;
      height : 5vw;
      background : url(${process.env.PUBLIC_URL}/image/icon/edit/delete.png);
      background-size : cover; 
    }
  }
`;

const DEFAULT_THUMBNAIL_PATH = `${process.env.PUBLIC_URL}/image/icon/etc/recipeImgAlt.png`;

const ThumbnailImage: React.FC<props> = ({ mode, s3, thumbnailUrl, setThumbnailUrl }) => {
  function uploadThumbnailHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const reader = new FileReader();
    const file = e.target.files![0];
    reader.readAsDataURL(file);

    const key = getNewKey(file);
    const url = getNewUrl(key);

    const obj = {
      Bucket: process.env.REACT_APP_AWS_BUCKET_NAME!,
      Body: file,
      Key: key,
      ContentType: file.type,
      ACL: 'public-read-write',
    };

    s3.putObject(obj, (err) => {
      if (err) {
        alert('업로드에 실패했습니다');
      } else {
        setThumbnailUrl(url);
      }
    });
  }

  async function deleteThumbnailHanlder() {
    await API.User.update.thumbnail(DEFAULT_THUMBNAIL_PATH);
    setThumbnailUrl(DEFAULT_THUMBNAIL_PATH);
  }

  return (
    <StyldThumbnailBox>
      {(mode === Mode.CREATE || mode === Mode.UPDATE) && (
        <>
          {thumbnailUrl
          ? <img src={thumbnailUrl} alt="main" />
          : <img src={DEFAULT_THUMBNAIL_PATH} alt="mainAlt" />}
          <div className="wrap">
            <input id="thumbnail" accept="image/*" type="file" onChange={uploadThumbnailHandler} />
            <button type="button" onClick={deleteThumbnailHanlder}>
              X
            </button>
          </div>
        </>
      )}
      {thumbnailUrl && mode === Mode.READ && <img src={thumbnailUrl} alt="으악" />}
    </StyldThumbnailBox>
  );
};

export { ThumbnailImage };
