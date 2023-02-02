import { translateText } from '../src/translation-service';

describe('Translation Service', () => {
  test('Translates the file', async () => {
    const result = await translateText('fr', 'Hello, World!');
    console.log(result[0].translations[0].text);
    expect(result[0].detectedLanguage.language).toBe('en');
  });
});
