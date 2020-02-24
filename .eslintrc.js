module.exports = {
    root: true,
    env: {
      browser: false,
      es6: true,
      node: true
    },
    parserOptions: { ecmaVersion: 8 },
    extends: [
      "eslint:recommended",
      "plugin:node/recommended",
      "plugin:promise/recommended",
      "plugin:prettier/recommended"
    ],
    plugins: ["node", "promise"],
    rules: {
      "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
      "node/exports-style": ["error", "module.exports"],
      "node/prefer-global/console": ["error", "always"]
    }
  };