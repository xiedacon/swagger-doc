'use strict'

const server = require('server')
const { get } = server.router
const { redirect } = server.reply
const opn = require('opn')

let port = 3000
let url = `http://localhost:${port}`

server({ port },
  require('./cors'),
  get('/', ctx => redirect('/index.html')),
  require('./swagger'),
  require('../api'),
  require('./static')
)

console.log(`Visit: ${url}`)
opn(url)
