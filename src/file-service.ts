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

function iterate(file) {
  Object.keys(file).forEach((key) => {
    if (typeof file[key] === 'object') {
      file[key] = iterate(file[key]);
    } else {
      console.log(file[key]);
    }
  });
  return file;
}

export const appendMissingFields = async (file) => {
  try {
    const baseFile = await readFile('to_translate/baseFile.json', 'utf-8');
    console.log(iterate(baseFile));
  } catch (err) {
    console.error(err);
    throw err;
  }
};
