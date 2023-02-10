/* eslint-disable security/detect-object-injection */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { translateText } from './translationService';

export const translateFile = async <Type> (lang: string, file: Type, allowList: Array<string>) : Promise<Type> => {
  async function iterate(toTranslate: Type) {
    const translatedFile = {};
    for (const key of Object.keys(toTranslate)) {
      if (typeof toTranslate[key] === 'object') {
        translatedFile[key] = await iterate(toTranslate[key] as Type);
      } else if (allowList.length === 0 || allowList.includes(key)) {
        translatedFile[key] = await translateText(lang, toTranslate[key] as string)
          .catch(() => Promise.reject(new Error()));
      } else {
        translatedFile[key] = toTranslate[key] as string;
      }
    }
    return translatedFile;
  }

  const translatedJson = await iterate(file);
  return translatedJson as Type;
};
