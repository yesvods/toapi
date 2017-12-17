const puppeteer = require('puppeteer')
const koa = require('koa')
const { register, middleware } = require('./toapi')

const start = async (...args) => {
  const app = new koa()
  global.browser = await puppeteer.launch({
    // headless: false,
  })

  app.use(middleware)
  app.listen(...args)
}

module.exports = {
  start,
  register,
}
