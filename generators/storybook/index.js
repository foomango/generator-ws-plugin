'use strict'
const Generator = require('yeoman-generator')

const { copyFolderTpl } = require('../utils')
module.exports = class extends Generator {
  installingDependencies() {
    this.yarnInstall(
      [
        '@storybook/addon-actions',
        '@storybook/addon-info',
        '@storybook/addon-links',
        '@storybook/addon-postcss',
        '@storybook/addons',
        '@storybook/builder-webpack5',
        '@storybook/manager-webpack5',
        '@storybook/react',
        'autoprefixer',
        'postcss-loader',
        'react-docgen-typescript-loader',
        'webpack',
        'webpack-bundle-analyzer',
        'webpack-cli',
        'webpack-dashboard',
        'webpack-dev-server',
      ],
      {
        dev: true,
      }
    )
  }

  writing() {
    copyFolderTpl({ destinationFolder: '.', generator: this })
  }
}
