import { translateFile } from '../src/translateFile';
// import { translateText } from '../src/translation-service';

describe.only('translateFile', () => {
  const mockTranslateText = jest.fn();
  const mockTranslateFile = jest.mock('../src/translation-service', () => ({
    translateText: mockTranslateText,
  }));
  test('Translates a given object', async () => {
    mockTranslateText.mockResolvedValue('Salut tout le monde!');
    const result = await translateFile('fr', { title: 'Hello, World!' });
    expect(result.title).toBe('Salut tout le monde!');
  });

  test('Translates a nested object', async () => {
    mockTranslateText.mockResolvedValue('Salut tout le monde!');
    const result = await translateFile('fr', { header: { title: 'Hello, World!' } });
    expect(result.header.title).toBe('Salut tout le monde!');
  });

  test.skip('Translate a nested nested object', async () => {
    const result = await translateFile('fr', { header: { title: 'Hello, World!', subtitle: { paragraph: 'I am a nested object' } } });
    expect(result.paragraph).toBe('Je suis un objet imbriqué');
  });
});