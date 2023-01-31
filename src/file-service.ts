import { readFile } from 'node:fs/promises';

// Read in the TO TRANSLATE file
export const readTranslationFile = async (): Promise<string> => {
  try {
    const file = await readFile('to_translate/lang.json', 'utf8');
    return file;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
