'use strict'

const {get} = require('server/router')

module.exports = [
  get('/hello', ctx => `Hello ${ctx.query.name}`)
]
