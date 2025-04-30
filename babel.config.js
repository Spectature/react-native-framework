module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'module:react-native-dotenv',
    {
      moduleName: '@env',
      path: `.env.${process.env.NODE_ENV}`,
      blacklist: null,
      whitelist: null,
      safe: false,
      allowUndefined: true,
    },
    'react-native-reanimated/plugin', // 注意：要放在最后一项
  ],
};
