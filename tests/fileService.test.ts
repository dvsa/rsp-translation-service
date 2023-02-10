import { readTranslationFile, writeTranslationFile } from '../src/fileService';

const mockReadFile = jest.fn();
const mockWriteFileSync = jest.fn();

jest.mock('node:fs', () => ({
  existsSync: jest.fn(),
  mkdirSync: jest.fn(),
  writeFileSync: (arg1, arg2) => mockWriteFileSync(arg1, arg2) as void,
  promises: {
    readFile: () => mockReadFile() as Promise<object>,
  },
}));

jest.mock('node:fs/promises', () => ({
  readFile: () => mockReadFile() as Promise<string>,
}));

const resolvedJSON = {
  site_title: 'DVSA roadside fines portal',
  footer: {
    cookies: 'Cookies',
  },
  validation: {
    code: 'Code required',
  },
};

describe('fileService', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  test('Correctly parses JSON from a file', async () => {
    mockReadFile.mockResolvedValueOnce(JSON.stringify(resolvedJSON));
    const readIn = await readTranslationFile();
    expect(readIn).toEqual(resolvedJSON);
  });

  test('Correctly sanitizes file name and writes to JSON file', () => {
    const testLang = ';tt3-[4]{';
    mockWriteFileSync.mockResolvedValue({});
    writeTranslationFile(testLang, { title: 'I am a title' });
    expect(mockWriteFileSync).toHaveBeenCalledWith('./translations/tt.json', JSON.stringify({ title: 'I am a title' }, null, 4));
  });
});
