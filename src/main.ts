import * as dotenv from 'dotenv';
import { readTranslationFile } from './file-service';
import { translateFile } from './translateFile';

dotenv.config();

export const main = async () => {
  try {
    // split the string in a list of languages
    const languages: Array<string> = (process.env.LANGUAGES).split(',');

    // log the languages to be translated
    // console.log(`Languages to translate file to: ${languages}`);

    // read in file containing data to be translated
    const fileObj = await readTranslationFile();
    // console.log(fileObj);

    const promises = [];
    languages.forEach((lang) => {
      promises.push(translateFile(lang, fileObj));
    });
    const returnPromises = await Promise.all(promises);
    console.log(returnPromises);
  } catch (err) {
    console.log(err);
  }
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async () => {
  await main();
})();
