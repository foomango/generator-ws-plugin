const webpack = require('webpack')

const __DEV__ = false

module.exports = {
  stories: ['../src/**/*.stories.[jt]s?(x)'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links'],
  webpackFinal: async (config) => {
    if (process.env.SKIP_WATCH === '1') {
      config.watch = false
    }
    config.watchOptions = {
      ignored: ['**/node_modules', '**/__mock__'],
    }
    config.plugins.push(
      new webpack.DefinePlugin({
        __DEV__,
      })
    )
    config.module.rules.push({
      test: /\.m?js/,
      resolve: {
        fullySpecified: false,
      },
    })
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [['@babel/preset-react', { flow: false, typescript: true }]],
          },
        },
      ],
    })
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    })
    config.resolve.extensions.push('.ts', '.tsx')

    return config
  },
  core: {
    builder: 'webpack5',
  },
}
