import { v1 } from 'uuid';
import { TagType } from '../types/tag';

const parseId = (path: string) => {
  const USER_ID_REGEX = /(?<userId>\d+)/;
  const parseResult = USER_ID_REGEX.exec(path)!;
  return Number(parseResult[0]);
};

const getTagString = (tags: TagType[]) => {
  if (tags.length !== 0) {
    return tags.map((tag) => `#${tag.name} `);
  }
  return '';
};

const getNewKey = (file: File) => `image/${v1().toString().replace('-', '')}.${file.type.split('/')[1]}`;
const getNewUrl = (key: string) =>
  `https://${process.env.REACT_APP_AWS_BUCKET_NAME}.s3.${process.env.REACT_APP_AWS_BUCKET_REGION}.amazonaws.com/${key}`;

export { parseId, getTagString, getNewKey, getNewUrl };
