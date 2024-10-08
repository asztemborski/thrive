module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "standard",
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  ignorePatterns: ["dist/*"],
  plugins: ["@typescript-eslint"],
  rules: {
    "no-void": "off",
    "no-useless-constructor": "off",
    "no-unsafe-declaration-merging": "off",
    "no-use-before-define": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        varsIgnorePattern: "^_",
        argsIgnorePattern: "^_",
      },
    ],
  },
};
