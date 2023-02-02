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
    const fileObj: object = JSON.parse(file);
    return fileObj;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
