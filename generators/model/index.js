'use strict'
const Generator = require('yeoman-generator')

const { copyFolderTpl } = require('../utils')

module.exports = class extends Generator {
  async prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'modelName',
        message: 'Your model name: ',
        validate: str => (str.length > 0 ? true : 'Model name is required.'),
      },
      {
        type: 'input',
        name: 'featureName',
        message: 'Your feature name: ',
        default: this.config.get('featureName'),
        validate: str => (str.length > 0 ? true : 'Feature name is required.'),
        store: true,
      },
    ]

    this.answers = await this.prompt(prompts)
  }

  writing() {
    copyFolderTpl({ generator: this })
  }
}
