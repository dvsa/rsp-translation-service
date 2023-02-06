/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable guard-for-in */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable security/detect-object-injection */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import * as dotenv from 'dotenv';
import { translateText } from './translation-service';

dotenv.config();

/* export const translateFile = async <Type> (lang: string, file: object): Promise<Type> => {
  return translation as Type;
}; */

export const translateFile = async (lang: string, file: object) => {
  // console.log('in', file);
  const promises = [];
  let counter = 0;

  function iterate(toTranslate) {
    // console.log(x);
    Object.keys(toTranslate).forEach((key) => {
      if (typeof toTranslate[key] === 'object') {
        toTranslate[key] = iterate(toTranslate[key]);
      } else {
        // console.log(lang, x[key]);
        console.log(toTranslate[key]);
        toTranslate[key] = promises.push(translateText(lang, toTranslate[key]));
      }
    });
    return toTranslate;
  }

  function assignPromises(x, translatedValues) {
    Object.keys(x).forEach((key) => {
      if (typeof x[key] === 'object') {
        x[key] = assignPromises(x[key], translatedValues);
      } else {
        // console.log(x[key]);
        x[key] = translatedValues[counter];
        counter++;
      }
    });
    return x;
  };

  async function complete(fileToMatch) {
    const res = await iterate(fileToMatch);
    const moreRes = await Promise.all(promises).then((resolvedPromises) => assignPromises(res, resolvedPromises));
    // console.log(promises);
    return moreRes;
  };

  /* async function complete(lang: string, file: object) {
    // const moreRes = await Promise.all(promises).then((translatedValues) => assignPromises(res, translatedValues));
    const moreRes = await Promise.all(
      Object.keys(file).map(async (key) => {
        const someRes = await translateText(lang, file[key]);
        console.log(someR)
      }),
    ).then((value) => console.log('then: ', value));
    console.log('translateFile.ts: ', moreRes);
    return moreRes;
  }; */

  const finale = await complete(file);
  return finale;
};
