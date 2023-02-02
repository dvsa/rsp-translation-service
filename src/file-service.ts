/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable security/detect-object-injection */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { readFile } from 'node:fs/promises';

// Read in the TO TRANSLATE file
export const readTranslationFile = async (): Promise<object> => {
  try {
    const file = await readFile('to_translate/lang.json', 'utf8');
    let fileObj = JSON.parse(file);
    const formattedFileObj = {};

    Object.keys(fileObj).forEach((key) => {
      const value = fileObj[key];

      if (typeof value === 'object') {
        Object.assign(formattedFileObj, value);
      } else {
        formattedFileObj[key] = value;
      }
    });
    return formattedFileObj;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
