/* This simple app uses the '/translate' resource to translate text from
one language to another. */

import uuid4 from 'uuid4';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const keyVar = 'TRANSLATOR_TEXT_RESOURCE_KEY';
if (!process.env[keyVar]) {
  throw new Error(`Please set/export the following environment variable: ${keyVar}`);
}
const resourceKey = process.env[keyVar];

const endpointVar = 'TRANSLATOR_TEXT_ENDPOINT';
if (!process.env[endpointVar]) {
  throw new Error(`Please set/export the following environment variable: ${endpointVar}`);
}
const endpoint = process.env[endpointVar];

const regionVar = 'TRANSLATOR_TEXT_REGION';
if (!process.env[regionVar]) {
  throw new Error(`Please set/export the following environment variable: ${regionVar}`);
}
const region = process.env[regionVar];

/* If you encounter any issues with the base_url or path, make sure that you are
using the latest endpoint: https://docs.microsoft.com/azure/cognitive-services/translator/reference/v3-0-translate */
// export async function translateText(lang, value): Promise<Array<Record<string, unknown>>> {
export async function translateText(lang, value) {
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
    const response = await axios(axiosOptions);
    /* const respObj = {
      translation: response.data[0].translations[0].text,
      language: response.data[0].translations[0].to,
    }; */
    return response.data[0].translations[0].text;
  } catch (err) {
    console.log(err.message);
    throw (err);
  }
}
