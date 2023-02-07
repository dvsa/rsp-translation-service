import { translateFile } from '../src/translateFile';

const mockTranslateText = jest.fn();

jest.mock('../src/translation-service', () => ({
  translateText: () => mockTranslateText() as Promise<string>,
}));

const language = 'fr';

const title = 'Hello, World!';

const translationTitle = 'Salut tout le monde!';
const translationNested = 'je suis un objet imbriqué';
const translationLink = 'Cliquez ici';

describe('translateFile', () => {
  afterEach(() => {
    mockTranslateText.mockRestore();
  });

  test('Translates a given object', async () => {
    mockTranslateText.mockResolvedValue(translationTitle);
    const result = await translateFile(language, { title });
    expect(result.title).toBe(translationTitle);
  });

  test('Translates a nested object', async () => {
    mockTranslateText.mockResolvedValue(translationTitle);
    const result = await translateFile(language, { header: { title } });
    expect(result.header.title).toBe(translationTitle);
  });

  test('Translate a nested nested object', async () => {
    mockTranslateText.mockResolvedValueOnce(translationTitle);
    mockTranslateText.mockResolvedValueOnce(translationNested);
    mockTranslateText.mockResolvedValueOnce(translationLink);
    const result = await translateFile(
      language,
      {
        header:
        {
          title: 'Hello, World!',
          subtitle: { paragraph: 'I am a nested object' },
        },
        link: 'click here',
      },
    );
    expect(result).toEqual({
      header: {
        title: translationTitle,
        subtitle: { paragraph: translationNested },
      },
      link: translationLink,
    });
  });
});
