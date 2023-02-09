import { translateText } from '../src/translationService';

describe('Translation Service', () => {
  test('Translates a string into a specified language', async () => {
    const result = await translateText('fr', 'Hello, World!');
    expect(result).toBe('Salut tout le monde!');
  });
});
