# DVSA Translation Service

### Script that takes a JSON file and translates it to the given languages and outputs translated JSON files

## To Run

Clone or download the project

Create and set your credentials in a `.env` file.

In the `.env` file, add all the languages you want to translate as a comma separated list. For example:

```
LANGUAGES=en,bg,fr,sp,cy
```

Put the JSON file you want to translate into the `to-translate` directory.

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
