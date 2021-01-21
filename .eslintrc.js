module.exports = {
  root: true,
  env: {
    node: true,
  },
  // plugins: ["vue/recommended"],
  extends: ["plugin:vue/recommended", "prettier/vue"],
  rules: {
    "no-console": "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-unused-vars": "off",
  },
  parserOptions: {
    parser: "babel-eslint",
  },
};
