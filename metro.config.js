const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    assetExts: (() => {
      const defaultConfig = getDefaultConfig(__dirname);
      return defaultConfig.resolver.assetExts.filter((ext) => ext !== 'svg');
    })(),
    sourceExts: (() => {
      const defaultConfig = getDefaultConfig(__dirname);
      return [...defaultConfig.resolver.sourceExts, 'svg'];
    })(),
    extraNodeModules: {
      src: path.resolve(__dirname, 'src'),
    },
  },
  watchFolders: [
    path.resolve(__dirname, 'src/assets'),
  ],
  transformer: {
    minifierPath: 'metro-minify-terser',
    minifierConfig: {
      ecma: 2022,
      module: true,
      safari10: true,
      compress: {
        reduce_funcs: false,
      },
      mangle: {
        toplevel: false,
      },
      output: {
        ascii_only: true,
        quote_style: 3,
        wrap_iife: true,
      },
      sourceMap: {
        includeSources: false,
      },
      toplevel: false,
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);