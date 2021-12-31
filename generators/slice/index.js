'use strict'
const Generator = require('yeoman-generator')

const { featureName2Class, copyFolderTpl, toCamelName } = require('../utils')

module.exports = class extends Generator {
  async prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'sliceName',
        message: 'Your slice name: ',
        validate: str => (str.length > 0 ? true : 'Slice name is required.'),
      },
      {
        type: 'input',
        name: 'featureName',
        message: 'Your feature name: ',
        default: this.config.get('featureName'),
        validate: str => (str.length > 0 ? true : 'Feature name is required.'),
        store: true,
      },
      {
        type: 'input',
        name: 'featureClass',
        message: 'Your feature class name: ',
        default: context => featureName2Class(context.featureName),
        validate: str => (str.length > 0 ? true : 'Feature name is required.'),
      },
      {
        type: 'input',
        name: 'parentReducerName',
        message: `Your slice's parent reducer name: `,
        default: context => context.featureName,
        validate: str => (str.length > 0 ? true : `Slice's parent reducer name is required.`),
      },
    ]

    this.answers = await this.prompt(prompts)
    if (this.answers.featureName) {
      this.answers.featureCamelName = toCamelName(this.answers.featureName)
    }

    if (this.answers.sliceName) {
      this.answers.sliceCamelName = toCamelName(this.answers.sliceName)
    }

    if (this.answers.parentReducerName) {
      this.answers.parentReducerCamelName = toCamelName(this.answers.parentReducerName)
    }
  }

  writing() {
    copyFolderTpl({ generator: this })
  }
}
