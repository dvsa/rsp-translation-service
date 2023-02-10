import { readFile } from 'node:fs/promises';
import * as fs from 'node:fs';

// Read in the TO TRANSLATE file
export const readTranslationFile = async (): Promise<object> => {
  try {
    const file: string = await readFile('to_translate/lang.json', 'utf8');
    const fileObj: object = JSON.parse(file) as object;
    return fileObj;
  } catch (err) {
    return Promise.reject(new Error());
  }
};

export const writeTranslationFile = (lang: string, value: object) => {
  try {
    if (!fs.existsSync('./translations')) {
      fs.mkdirSync('./translations');
    }

    const safeLang = lang.replace(/[^a-z]/gi, '').toLowerCase();
    const fileName = `./translations/${safeLang}.json`;
    console.log(`Writing to ${fileName}`);
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    fs.writeFileSync(fileName, JSON.stringify(value, null, 4));
  } catch (err) {
    console.log(err);
    throw (err);
  }
};
