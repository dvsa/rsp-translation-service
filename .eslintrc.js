module.exports = {
	"extends": "@dvsa/eslint-config-ts",
    "ignorePatterns": ["babel.config.js"],
    "parserOptions": {
        "project": "./tsconfig.json",
        "tsconfigRootDir": __dirname
    }
}