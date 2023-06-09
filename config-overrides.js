const webpack = require('webpack');

module.exports = function override(webpackConfig) {
  // Disable resolving ESM paths as fully specified.
  // See: https://github.com/webpack/webpack/issues/11467#issuecomment-691873586
  webpackConfig.module.rules.push({
    test: /\.m?js/,
    resolve: {
      fullySpecified: false,
    },
  });

  // Ignore source map warnings from node_modules.
  // See: https://github.com/facebook/create-react-app/pull/11752
  webpackConfig.ignoreWarnings = [/Failed to parse source map/];

  // Polyfill Buffer.
  webpackConfig.plugins.push(
    new webpack.ProvidePlugin(
      { Buffer: ['buffer', 'Buffer'], process: "process/browser" }
    ),
    // new webpack.ProvidePlugin({
    //   process: 'process/browser',
    // }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  );


  // Polyfill other modules.
  webpackConfig.resolve.fallback = {
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    util: require.resolve("util"),
    assert: require.resolve("assert"),
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    fs: false,
    // process: true,
    path: false,
    zlib: false,
  };
  webpackConfig.resolve.alias = {
    process: "process/browser"
  }

  return webpackConfig;
};