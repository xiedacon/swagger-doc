'use strict'

const fs = require('fs')
const { resolve } = require('path')

const { type, status } = require('server/reply')
const mime = require('mime-types')

const promisify = require('./promisify')

const readFile = promisify(fs.readFile).bind(fs)

module.exports = async ctx => {
  if (ctx.solved) return

  try {
    return type(mime.lookup(ctx.path))
      .send(await readFile(resolve(__dirname, '..', ctx.path.substr(1)), { encoding: 'utf8' }))
  } catch (err) {
    return status(404).send('Not Found')
  }
}
