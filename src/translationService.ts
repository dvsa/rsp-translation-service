/* This simple app uses the '/translate' resource to translate text from
one language to another. */

import uuid4 from 'uuid4';
import dotenv from 'dotenv';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { TranslatedLanguage } from './types/translation-api-response';

dotenv.config();

const resourceKey = process.env.TRANSLATOR_TEXT_RESOURCE_KEY;
if (!resourceKey) {
  throw new Error('Please set/export the following environment variable: TRANSLATOR_TEXT_RESOURCE_KEY');
}

const endpoint = process.env.TRANSLATOR_TEXT_ENDPOINT;
if (!endpoint) {
  throw new Error('Please set/export the following environment variable: TRANSLATOR_TEXT_ENDPOINT');
}

const region = process.env.TRANSLATOR_TEXT_REGION;
if (!region) {
  throw new Error('Please set/export the following environment variable: TRANSLATOR_TEXT_REGION');
}

/* If you encounter any issues with the base_url or path, make sure that you are
using the latest endpoint: https://docs.microsoft.com/azure/cognitive-services/translator/reference/v3-0-translate */
// export async function translateText(lang, value): Promise<Array<Record<string, unknown>>> {
export async function translateText(lang: string, value: string): Promise<string> {
  const axiosOptions = {
    url: 'translate',
    method: 'post',
    baseURL: endpoint,
    params: {
      'api-version': '3.0',
      to: lang,
    },
    headers: {
      'Ocp-Apim-Subscription-Key': resourceKey,
      'Ocp-Apim-Subscription-Region': region,
      'Content-type': 'application/json',
      'X-ClientTraceId': uuid4().toString(),
    },
    data: [{
      text: value,
    }],
  };

  try {
    const response: AxiosResponse<Array<TranslatedLanguage>> = await axios(axiosOptions);
    /* const respObj = {
      translation: response.data[0].translations[0].text,
      language: response.data[0].translations[0].to,
    }; */
    return response.data[0].translations[0].text;
  } catch (err) {
    const msg = `There was an error when calling to the translation API. The following was received: ${(err as AxiosError).response?.status}, ${((err as AxiosError).code)}`;
    console.log(msg);
    return Promise.reject(new Error(msg));
  }
}
