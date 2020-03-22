module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    node: true
  },
  plugins: ['xmfe'],
  extends: ['plugin:xmfe/node']
};
