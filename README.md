# DVSA Translation Service

### Script that takes a JSON file and translates it to the given languages and outputs translated JSON files

## To Run

Clone or download the project

Create and set your credentials in a `.env` file.

In the `.env` file, add all the languages you want to translate as a comma separated list. Languages must be two-letter codes - anything that does not follow this format will be removed from the list of languages prior to translation. For example:

```
LANGUAGES=en,bg,fr,es,cy
```

Also in the `.env` file, add all the keys you want to translate as a comma separated list. If there are no keys set in the allow list, everything will be translated. For example:

```
ALLOW_LIST=site_title,feedback_banner,cookies,terms_conditions
```

Put the JSON file you want to translate into the `to-translate` directory. Ensure it is titled `lang.json`.

Set the Node version:

```shell
nvm use
```

If you don't have TypeScript installed:

```shell
npm install typescript ts-node --global --save-dev
```

Install all dependencies:

```shell
npm i 
```

To run:

```shell
npm run translate
```
