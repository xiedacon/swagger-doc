'use strict'

const server = require('server')
const { get } = server.router
const { redirect } = server.reply

server({ port: 3000 },
  require('./cors'),
  get('/', ctx => redirect('/index.html')),
  require('./swagger'),
  require('../api'),
  require('./static')
)
