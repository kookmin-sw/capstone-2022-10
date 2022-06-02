import { RequestPath } from '../../static';
import { ImageType } from '../../types/enum';

async function parseImage(imageOption: ImageType, formData: string | FormData) {
  try {
    const response = await fetch(
      imageOption.includes('RECEIPT')
        ? `${process.env.REACT_APP_IMAGE_PARSE_SERVER_URL}${RequestPath.ImageParse.RECEIPT}`
        : `${process.env.REACT_APP_IMAGE_PARSE_SERVER_URL}${RequestPath.ImageParse.INGREDIENT}`,
      {
        method: 'POST',
        headers: {
          accept: 'application/json',
        },
        body: formData,
        redirect: 'follow',
        mode: 'cors',
      },
    );
    return await response.text();
  } catch (e) {
    return 'fail';
  }
}

export { parseImage };
