module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['./custom-rn-preset.js', {unstable_transformProfile: 'default'}],
      'module:react-native-dotenv',
    ],
    plugins: ['@babel/plugin-syntax-flow', '@babel/plugin-transform-flow-strip-types'],
  };
};