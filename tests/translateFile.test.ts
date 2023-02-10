import { translateFile } from '../src/translateFile';

const mockTranslateText = jest.fn();

jest.mock('../src/translationService', () => ({
  translateText: () => mockTranslateText() as Promise<string>,
}));

const language = 'fr';
const allowList = ['title', 'paragraph', 'link'];

const title = 'Hello, World!';

const translationTitle = 'Salut tout le monde!';
const translationNested = 'je suis un objet imbriqué';
const translationLink = 'Cliquez ici';

describe('translateFile', () => {
  afterEach(() => {
    mockTranslateText.mockRestore();
  });

  test('Translates an object', async () => {
    mockTranslateText.mockResolvedValue(translationTitle);
    const result = await translateFile(language, { title }, allowList);
    expect(result.title).toBe(translationTitle);
  });

  test('Translates a nested object', async () => {
    mockTranslateText.mockResolvedValue(translationTitle);
    const result = await translateFile(language, { header: { title } }, allowList);
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
      allowList,
    );
    expect(result).toEqual({
      header: {
        title: translationTitle,
        subtitle: { paragraph: translationNested },
      },
      link: translationLink,
    });
  });

  test('Ignores item if it is not in allowList', async () => {
    mockTranslateText.mockResolvedValueOnce(translationTitle);
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
      ['title', 'link'],
    );
    expect(result).toEqual({
      header:
        {
          title: translationTitle,
          subtitle: { paragraph: 'I am a nested object' },
        },
      link: translationLink,
    });
  });

  test('If allow list is empty, all items are translated', async () => {
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
      [],
    );
    expect(result).toEqual({
      header:
        {
          title: translationTitle,
          subtitle: { paragraph: translationNested },
        },
      link: translationLink,
    });
  });

  test('If passed language is invalid, it passes the error', async () => {
    mockTranslateText.mockRejectedValueOnce('error');
    const result = async () => {
      try {
        await translateFile(
          'xr',
          {
            title: 'I am a translation',
          },
          ['title'],
        );
        return await Promise.resolve();
      } catch (err) {
        return err as Error;
      }
    };
    expect(await result()).toEqual(Error());
  });
});
