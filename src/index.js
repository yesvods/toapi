const puppeteer = require('puppeteer')
const koa = require('koa')
const chalk = require('chalk')
const { register, middleware } = require('./toapi')
const _ = require('lodash')

let waitUntil
let timeout

const _register = options => {
  if (!_.isUndefined(waitUntil)) {
    options.waitUntil = waitUntil
  }
  if (!_.isUndefined(timeout)) {
    options.timeout = timeout
  }
  return register(options)
}

const start = async (port = 3000, options) => {
  if (!_.isUndefined(options.waitUntil)) {
    waitUntil = options.waitUntil
  }
  if (!_.isUndefined(timeout)) {
    timeout = options.timeout
  }
  const app = new koa(options)
  global.browser = await puppeteer.launch({
    // headless: false,
  })

  app.use(middleware)
  app.listen(port)
  console.log(
    `\n  ${chalk.green(
      'TOAPI',
    )} started at port ${port}, have a good jounery! 🚀 🚀 🚀`,
  )
}

module.exports = {
  start,
  register: _register,
}
