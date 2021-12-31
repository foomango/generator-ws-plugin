'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')

module.exports = class extends Generator {
  initializing() {
    this.env.adapter.promptModule.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'))
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(`Welcome to the praiseworthy ${chalk.red('generator-ws-plugin')} generator!`))

    const searchSubGenerators = (answers, input = '') => {
      const choices = [
        { name: 'Component with Redux', value: 'reduxComponent' },
        { name: 'Simple Component', value: 'simpleComponent' },
        { name: 'Model', value: 'model' },
        { name: 'Slice', value: 'slice' },
        { name: 'GridView Component', value: 'gridViewComponent' },
        { name: 'Feature', value: 'feature' },
        { name: 'Storybook', value: 'storybook' },
      ]

      const filteredChoices = input.length
        ? choices.filter(choice => choice.name.toLowerCase().includes(input.toLowerCase()))
        : choices

      return filteredChoices
    }

    const prompts = [
      {
        type: 'autocomplete',
        name: 'subGenerator',
        message: 'What do you want to generate?',
        source: searchSubGenerators,
        default: 'reduxComponent',
      },
    ]

    return this.prompt(prompts).then(answers => {
      this.answers = answers
    })
  }

  writing() {
    this.composeWith(`ws-plugin:${this.answers.subGenerator}`)
  }
}
