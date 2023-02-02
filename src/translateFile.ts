import * as dotenv from 'dotenv';
import { translateText } from './translation-service';

dotenv.config();

export const translateFile = async (lang: string, file: object) => {
  const promises = [];
  const keys = [];
  Object.entries(file).forEach((value) => {
    if (typeof value[1] === 'object') {
      keys.push(value[0]);
      promises.push(null);
      Object.entries(value[1] as string).forEach((subvalue) => {
        keys.push(subvalue[0]);
        promises.push(translateText(lang, subvalue[1]));
      });
    } else {
      keys.push(value[0]);
      promises.push(translateText(lang, value[1]));
    }
  });
  const returnPromises = await Promise.all(promises);
  const translation = {};
  keys.forEach((key, index: number) => {
    translation[keys[index]] = returnPromises[index];
  });
  // console.log(translation);
  return translation;
};
