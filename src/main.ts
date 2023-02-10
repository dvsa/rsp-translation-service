/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import * as dotenv from 'dotenv';
import { readTranslationFile, writeTranslationFile } from './fileService';
import { translateFile } from './translateFile';

dotenv.config();

export const main = async () => {
  try {
    // split the string in to an array of languages
    const languages: Array<string> = ((process.env.LANGUAGES).split(',').filter((element) => element.length === 2));

    // split the allow list in to an array of words
    const allowList: Array<string> = ((process.env.ALLOW_LIST).split(',')).filter((element) => !(element === ''));

    await readTranslationFile()
      .then(async (fileObj) => {
        for (const lang of languages) {
          await translateFile(lang, fileObj, allowList)
            .then((value) => writeTranslationFile(lang, value))
            .catch(() => console.log(`There was an error translating the language ${lang}. Please ensure it is a valid language code.`));
        }
      })
      .catch(() => console.log('There was an error reading the lang.json file.'));
  } catch (err) {
    console.log(err);
  }
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async () => {
  await main();
})();
