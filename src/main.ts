import * as dotenv from 'dotenv';
import { readTranslationFile } from './file-service';

dotenv.config();

export const main = async () => {
  try {
    const languages = process.env.LANGUAGES;
    // split the string in a list of languages
    console.log(`Languages to translate file to: ${languages}`);

    const file = await readTranslationFile();

    console.log(`Text to translate: ${file}`);
  } catch (err) {
    console.error(err);
  }
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async () => {
  await main();
})();
