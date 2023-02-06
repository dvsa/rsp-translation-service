import * as dotenv from 'dotenv';
import * as fs from 'node:fs';
import { readTranslationFile } from './file-service';
import { translateFile } from './translateFile';

dotenv.config();

export const main = async () => {
  try {
    // split the string in a list of languages
    const languages: Array<string> = (process.env.LANGUAGES).split(',');

    // log the languages to be translated
    // console.log(`Languages to translate file to: ${languages}`);
    // const fileObjA = await readTranslationFile();
    languages.map(async (lang) => {
      const fileObjA = await readTranslationFile();
      await translateFile(lang, fileObjA)
        .then((value) => {
          console.log(value);
          fs.writeFile(`./translations/${lang}.json`, JSON.stringify(value), (err) => {
            if (err) {
              console.error(err);
            }
          });
        });
      return '';
    });
  } catch (err) {
    console.log(err);
  }
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async () => {
  await main();
})();
