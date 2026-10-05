const reactNativeBabelPreset = require('@react-native/babel-preset');

function getPluginName(plugin) {
  if (typeof plugin === 'string') {
    return plugin;
  }
  if (Array.isArray(plugin) && plugin.length > 0) {
    const first = plugin[0];
    if (typeof first === 'string') {
      return first;
    }
    return first.name || first.displayName || '';
  }
  return '';
}

module.exports = function (api, options) {
  const presetConfig = reactNativeBabelPreset(api, {
    ...options,
    unstable_transformProfile: 'default',
  });

  if (presetConfig.overrides) {
    presetConfig.overrides = presetConfig.overrides.map(override => {
      if (override.plugins) {
        override.plugins = override.plugins.filter(plugin => {
          const pluginName = getPluginName(plugin);
          // Only remove hermes parser with Flow
          if (pluginName && (pluginName.includes('syntax-hermes-parser') || pluginName === 'babel-plugin-syntax-hermes-parser')) {
            return false;
          }
          return true;
        });
      }
      return override;
    });
  }

  return presetConfig;
};