'use strict'

const fs = require('fs')
const { resolve, relative } = require('path')

const { get } = require('server/router')
const yaml = require('js-yaml')
const promisify = require('./promisify')

const glob = promisify(require('glob'))
const readFile = promisify(fs.readFile).bind(fs)

async function load (path) {
  return yaml.safeLoad(await readFile(resolve(__dirname, path), { encoding: 'utf8' }))
}

module.exports = get('/swagger', async ctx => {
  let config = await load('../swagger.yaml')

  config.definitions = await load('../definitions.yaml')

  let paths = await Promise.all([resolve(__dirname, '../api/**/*.yaml'), resolve(__dirname, '../api/**/*.yml')].map(path => glob(path)))
  config.paths = Array.prototype.concat.apply([], paths)
    .map(path => relative(resolve(__dirname, '../api'), path))
    .reduce((paths, path) => {
      paths[`/${path.split('.')[0]}`] = { $ref: `/api/${path}` }

      return paths
    }, {})

  return config
})
