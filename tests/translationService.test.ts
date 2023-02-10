import axios from 'axios';
import { translateText } from '../src/translationService';

jest.mock('axios');
const mockAxios = axios as jest.MockedFunction<typeof axios>;

mockAxios.mockResolvedValue({ status: 200, data: 'mockResponse' });

describe('Translation Service', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  test('Translates a string into a specified language', async () => {
    mockAxios.mockResolvedValue({
      data: [
        {
          translations: [
            { text: 'Salut tout le monde!' },
          ],
        },
      ],
    });
    const result = await translateText('fr', 'Hello, World!');
    expect(result).toBe('Salut tout le monde!');
  });

  test('If an error is encountered with the service, it returns the error', async () => {
    mockAxios.mockRejectedValue({ response: { status: 500 }, code: 'mockResponse' });
    const result = async () => {
      try {
        await translateText('xr', 'Hello, World!');
        return await Promise.resolve();
      } catch (err) {
        return err as Error;
      }
    };
    const err = await result();
    expect(err).toBeInstanceOf(Error);
  });

  test('If an error is encountered with the service, it logs the status code and error message to the console', async () => {
    mockAxios.mockRejectedValue({ response: { status: 400 }, code: 'ERR_BAD_REQUEST' });
    const result = async () => {
      try {
        await translateText('xr', 'Hello, World!');
        return await Promise.resolve();
      } catch (err) {
        return err as Error;
      }
    };
    const err = await result();
    expect((err as Error).message).toBe('There was an error when calling to the translation API. The following was received: 400, ERR_BAD_REQUEST');
  });
});
