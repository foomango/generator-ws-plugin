const fs = require('fs')
const path = require('path')
const { get } = require('lodash')

const PLACEHOLDERS = [
  'featureName',
  'featureCamelName',
  'featureClass',
  'componentName',
  'sliceName',
  'sliceCamelName',
  'parentReducerName',
  'parentReducerCamelName',
  'modelName',
  'entryName',
  'entryCamelName',
]

function* walkSync(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true })
  for (const file of files) {
    if (file.isDirectory()) {
      yield* walkSync(path.join(dir, file.name))
    } else {
      yield path.join(dir, file.name)
    }
  }
}

const replacePlaceholders = (generator, fn, placeholders = PLACEHOLDERS) => {
  placeholders.forEach(placeholder => {
    const value = get(generator, `answers.${placeholder}`)
    if (value) {
      fn(placeholder, value)
    }
  })
}

const getDestinationPath = ({ from, destinationFolder, generator, placeholders = PLACEHOLDERS }) => {
  let relativePath = from.substring(generator.templatePath().length + 1).replace(/\.ejs$/, '')

  replacePlaceholders(
    generator,
    (placeholder, value) => {
      relativePath = relativePath.replace(new RegExp(`__${placeholder}__`, 'g'), value)
    },
    placeholders
  )

  return generator.destinationPath(`${destinationFolder}/${relativePath}`)
}

const copyFolderTpl = ({ from = '', destinationFolder = 'src/features', generator, placeholders = PLACEHOLDERS }) => {
  const context = {}
  replacePlaceholders(
    generator,
    (placeholder, value) => {
      context[placeholder] = value
    },
    placeholders
  )

  for (const filePath of walkSync(generator.templatePath(from))) {
    const destinationPath = getDestinationPath({
      from: filePath,
      destinationFolder,
      generator,
    })
    generator.fs.copyTpl(filePath, destinationPath, /\.ejs$/.test(filePath) ? context : undefined)
  }
}

const featureName2Class = name =>
  name
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .substring(1)

const toCamelName = name => name[0].toLowerCase() + name.substring(1)

module.exports = {
  PLACEHOLDERS,
  walkSync,
  replacePlaceholders,
  getDestinationPath,
  copyFolderTpl,
  featureName2Class,
  toCamelName,
}
