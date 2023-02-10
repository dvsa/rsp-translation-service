import { translateText } from '../src/translationService';

jest.spyOn(console, 'log');
jest.spyOn(console, 'error');

const axiosMock = jest.mock('axios');

describe('Translation Service', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  test('Translates a string into a specified language', async () => {
    const result = await translateText('fr', 'Hello, World!');
    expect(result).toBe('Salut tout le monde!');
  });

  test('If an error is encountered with the service, it logs the error out', async () => {
    const result = async () => {
      try {
        await translateText('xr', 'Hello, World!');
        return await Promise.resolve();
      } catch (err) {
        return err as Error;
      }
    };
    expect(await result()).toEqual(Error());
  });

  test('If an error is encountered with the service, it logs the status code and error message to the console', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const result = async () => {
      try {
        await translateText('xr', 'Hello, World!');
        return await Promise.resolve();
      } catch (err) {
        return err as Error;
      }
    };
    await result();
    expect(consoleSpy).toHaveBeenCalledWith(400, 'ERR_BAD_REQUEST');
  });
});
