import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MultilineInput } from 'react-input-multiline';

import { getNewKey, getNewUrl } from '../../../../helper';
import { Mode } from '../../type';

enum Input {
  DESCRIPTION = 'DESCRIPTION',
  IMAGE_URL = 'IMAGE_URL',
}

type props = {
  mode: Mode;
  id: number;
  imageUrl: string;
  imageDescription: string;
  s3: AWS.S3;
  deleteElement: (id: number) => void;
  setDescription: (id: number, value: string) => void;
  setImageUrl: (id: number, value: string) => void;
};

const StyledElement = styled.div`
  margin: 2vw 0;
  width: 80vw;
  img {
    width: 80vw;
    border-radius: 5vw;
    margin: 2vw 0;
  }

  .wrap {
    padding: 10px;
     {
      font-size: 5vw;
      @media all and (min-aspect-ratio: 400/650) {
        font-size: 3vw;
      }
    }
  }

  #DESCRIPTION {
    display: block;
    border: 1px solid black;
    border-radius: 10px;
    padding: 10px;
    margin: 2vw 0;
     {
      font-size: 5vw;
      @media all and (min-aspect-ratio: 400/650) {
        font-size: 3vw;
      }
    }
  }

  #DESCRIPTION[contenteditable='false'] {
    border: none;
  }

  .wrap {
    display: grid;
    grid-template-columns: 1fr 5vw;
  }

  input:disabled {
    display: block;
    padding: 0 5vw;
    background: pink;
    margin: 2vw 0;
    display: block;
    font-size: 3.5vw;
    width: 80vw;
    line-height: 5vw;
    border: 0 solid black;
    color: black;
    word-wrap: normal;
  }

  button {
    color: rgba(0, 0, 0, 0);
    border: none;
    margin-top: 1vw;
    width: 4vw;
    height: 4vw;
    background: url(${process.env.PUBLIC_URL}/image/icon/edit/delete.png);
    background-size: cover;
  }
`;

const RecipeDescriptionElement: React.FC<props> = ({
  mode,
  id,
  imageUrl,
  imageDescription,
  s3,
  deleteElement,
  setDescription,
  setImageUrl,
}) => {
  const [localImageUrl, setLocalImageUrl] = useState('');

  function setValue(e: React.ChangeEvent<HTMLInputElement>): void | Promise<void> {
    if (e.currentTarget.id === Input.DESCRIPTION) {
      setDescription(id, e.currentTarget.value);
    } else {
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
          setLocalImageUrl(url);
          setImageUrl(id, url);
        }
      });
    }
  }

  function remove() {
    deleteElement(id);
  }

  useEffect(() => {
    setLocalImageUrl(imageUrl);
  }, []);

  return (
    <StyledElement>
      {localImageUrl && <img src={localImageUrl} alt="" />}
      <MultilineInput
        id={Input.DESCRIPTION}
        value={imageDescription}
        onChange={setValue}
        placeholder="설명"
        disabled={mode === Mode.READ}
      />
      <div className="wrap">
        {(mode === Mode.CREATE || mode === Mode.UPDATE) && <input id={Input.IMAGE_URL} onChange={setValue} type="file" />}
        {(mode === Mode.CREATE || mode === Mode.UPDATE) && (
          <button type="button" onClick={remove}>
            X
          </button>
        )}
      </div>
    </StyledElement>
  );
};

export default RecipeDescriptionElement;
