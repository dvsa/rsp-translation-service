module.exports = {
	"extends": "@dvsa/eslint-config-ts",
<<<<<<< HEAD
    "ignorePatterns": ["babel.config.js", ".eslintrc.js", "jest.config.js"],
=======
    "ignorePatterns": ["babel.config.js", ".eslintrc.js"],
>>>>>>> 9e5bf20 (Fixed eslintrc.js, made linting fixes)
    "parserOptions": {
        "project": "./tsconfig.json",
        "tsconfigRootDir": __dirname
    }
}