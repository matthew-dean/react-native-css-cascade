module.exports = {
  "parser": "@typescript-eslint/parser",
  "extends": [
    "standard",
    "standard-react",
    "plugin:prettier/recommended",
    "prettier/standard",
    "prettier/react",
    "plugin:@typescript-eslint/eslint-recommended"
  ],
  "env": {
    "node": true
  },
  "parserOptions": {
    "ecmaVersion": 2020,
    "ecmaFeatures": {
      "legacyDecorators": true,
      "jsx": true
    }
  },
  "settings": {
    "react": {
      "version": "18"
    }
  },
  "rules": {
    "space-before-function-paren": 0,
    "react/prop-types": 0,
    "react/jsx-handler-names": 0,
    "react/jsx-fragments": 0,
    "react/no-unused-prop-types": 0,
    "import/export": 0
  }
}
