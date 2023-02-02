/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable security/detect-object-injection */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* This simple app uses the '/translate' resource to translate text from
one language to another. */

import { resolve } from 'path';
import { send } from 'process';

/* This template relies on the request module, a simplified and user friendly
way to make HTTP requests. */
import uuid4 from 'uuid4';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

let keyVar = 'TRANSLATOR_TEXT_RESOURCE_KEY';
if (!process.env[keyVar]) {
  throw new Error(`Please set/export the following environment variable: ${keyVar}`);
}
let resourceKey = process.env[keyVar];

let endpointVar = 'TRANSLATOR_TEXT_ENDPOINT';
if (!process.env[endpointVar]) {
  throw new Error(`Please set/export the following environment variable: ${endpointVar}`);
}
let endpoint = process.env[endpointVar];

let regionVar = 'TRANSLATOR_TEXT_REGION';
if (!process.env[regionVar]) {
  throw new Error(`Please set/export the following environment variable: ${regionVar}`);
}
let region = process.env[regionVar];

/* If you encounter any issues with the base_url or path, make sure that you are
using the latest endpoint: https://docs.microsoft.com/azure/cognitive-services/translator/reference/v3-0-translate */
export async function translateText(lang, value): Promise<Array<Record<string, unknown>>> {
  let axiosOptions = {
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
    return response.data;
  } catch (err) {
    // console.log(err);
    console.log(err.response.data);
    console.log(err.message);
    throw (err);
  }
}
