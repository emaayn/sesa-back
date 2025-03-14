import { extname } from "path";

export const randomStringWithNums = (length) => {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  export const setPhotoName = (req, file, callback) => {
    const name = randomStringWithNums(40);
    const fileExtName = extname(file.originalname);
    callback(null, `${name}${fileExtName}`);    
  };

  export const customFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|pdf|webp)$/)) {
        
      return callback(new Error('File type not correct!'), false);
    }    
    callback(null, true);
  };