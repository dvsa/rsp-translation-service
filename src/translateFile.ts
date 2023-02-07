/* eslint-disable security/detect-object-injection */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { translateText } from './translation-service';

export const translateFile = async <Type> (lang: string, file: Type) : Promise<Type> => {
  async function iterate(toTranslate: Type) {
    const translatedFile = {};
    for (const key of Object.keys(toTranslate)) {
      if (typeof toTranslate[key] === 'object') {
        translatedFile[key] = await iterate(toTranslate[key] as Type);
      } else {
        translatedFile[key] = await translateText(lang, toTranslate[key]);
      }
    }
    return translatedFile;
  }

  const translatedJson = await iterate(file);
  return translatedJson as Type;
};
