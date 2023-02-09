import * as fs from 'node:fs';
import { readTranslationFile, writeTranslationFile } from '../src/fileService';

describe('file-service', () => {
  test('Correctly parses JSON from a file', async () => {
    const readIn = await readTranslationFile();
    expect(readIn).toEqual({
      site_title: 'DVSA roadside fines portal',
      feedback_banner: 'This is a new service - your feedback will help us to improve it.',
      footer: {
        cookies: 'Cookies',
        terms_conditions: 'Terms and conditions',
        accessibility_statement: 'Accessibility statement',
        privacy_statement: 'Privacy statement',
        copyright: 'Crown Copyright',
      },
      validation: {
        code: 'Code required',
      },
      home: {
        title: 'Pay a DVSA roadside fine',
        help_text: 'Enter the 16 digit code',
      },
    });
  });

  test('Correctly sanitizes file name', () => {
    const testLang = ';tt3-[4]{';
    writeTranslationFile(testLang, { test: 'this is a test' });
    expect(fs.existsSync('./translations/tt.json')).toBe(true);
  });
});
