import * as dotenv from 'dotenv';
import { readTranslationFile } from './file-service';
import { translateText } from './translation-service';

dotenv.config();

export const main = async () => {
  try {
    // split the string in a list of languages
    const languages = (process.env.LANGUAGES).split(',');

    // log the languages to be translated
    console.log(`Languages to translate file to: ${languages}`);

    // read in file containing data to be translated
    const fileObj = await readTranslationFile();

    console.log('Text to translate: ', fileObj);
    // iterate through list of languages and call translate API on each
    // have a look into promise.all
    const promises = [];
    languages.forEach((lang) => {
      Object.values(fileObj).forEach((value) => {
        promises.push(translateText(lang, value));
      });
    });

    const text = await Promise.all(promises);
    text.forEach((item) => {
      console.log(item[0]);
    });
    console.log(text[0][0].translations[0].text);
  } catch (err) {
    console.error(err);
  }
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async () => {
  await main();
})();
