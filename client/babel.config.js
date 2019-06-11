module.exports = function (api) { //adding the react-native-dotenv module
  api.cache(true);
  const presets = ['module:metro-react-native-babel-preset', 'module:react-native-dotenv']

  return {
    presets
  }
};
