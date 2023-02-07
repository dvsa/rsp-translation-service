import * as dotenv from 'dotenv';
import * as fs from 'node:fs';
import { readTranslationFile, appendMissingFields } from './file-service';
import { translateFile } from './translateFile';

dotenv.config();

export const main = async () => {
  try {
    // split the string in a list of languages
    const languages: Array<string> = (process.env.LANGUAGES).split(',');

    const perChunk = 1;
    const result = languages.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / perChunk);
      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [];
      }
      resultArray[chunkIndex].push(item);
      return resultArray;
    }, []);

    console.log(result);

    // const fileObjA = await readTranslationFile();
    for (const batch of result) {
      await Promise.all(batch.map(async (lang) => {
        const fileObjA = await readTranslationFile();
        await translateFile(lang, fileObjA)
          .then((value) => {
            fs.writeFile(`./translations/${lang}.json`, JSON.stringify(value, null, 4), (err) => {
              if (err) {
                console.error(err);
              }
            });
          });
      }));
    }

    // const fileObjA = await readTranslationFile();
    // console.log(appendMissingFields(fileObjA));
  } catch (err) {
    console.log(err);
  }
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async () => {
  await main();
})();
