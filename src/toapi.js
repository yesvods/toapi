const urlParse = require('url-parse')
const Router = require('koa-router')
const RouteParser = require('route-parser')
const fetch = require('./fetch')
const _ = require('lodash')
const temme = require('temme').default
const md5 = require('md5')
const minify = require('html-minifier').minify

global.log = {
  info: require('debug')('info'),
  error: require('debug')('error'),
}

const router = new Router()
const str = JSON.stringify.bind(JSON)

const parseToRoute = url => {
  log.info(`Parsing ${url}`)
  url = urlParse(url)
  return { routeName: url.pathname }
}

let htmlStorage = {}
let selectorHtmlToJSON = {}

const register = async ({ routeName, matchUrl, selector, waitUntil }) => {
  if (!routeName) {
    routeName = parseToRoute(matchUrl).routeName
  }
  const routeMatcher = new RouteParser(matchUrl)
  const selectorHash = md5(selector)
  log.info(`Registing route: ${routeName}, Target match route: ${matchUrl}`)
  router.get(routeName, async (ctx, next) => {
    const { params } = ctx
    const targetUrl = routeMatcher.reverse(params)
    log.info(`Parse params ${str(params)}`)
    log.info(`TargetUrl ${targetUrl}`)

    // GET HTML
    let html = htmlStorage[targetUrl]
    if (html) {
      log.info(`Found the HTML cache, use it!`)
    } else {
      log.info(`HTML not found, requesting.. ${targetUrl}`)
      const { success, content } = await fetch({ url: targetUrl, waitUntil })
      if (!success) {
        log.error(`Request ${targetUrl} error`)
        throw new Error(`Request ${targetUrl} error`)
      }
      log.info(`done`)
      html = content
      htmlStorage[targetUrl] = content
    }

    // GET API_JSON
    const htmlHash = md5(html)
    let json = _.get(selectorHtmlToJSON, `${selectorHash}.${htmlHash}`)
    if (json) {
      log.info(`Found the JSON cache, use it!`)
    } else {
      log.info(`Cache JSON not found, parsing html with temme...`)
      try {
        json = temme(html, selector)
      } catch (e) {
        log.error(`Parse html with temme error`)
        log.error(e)
      }
      console.log(html)
      console.log(selector)
      _.set(selectorHtmlToJSON, `${selectorHash}.${htmlHash}`, json)
      log.info('All done!')
    }

    ctx.body = json
  })
}
const middleware = async (ctx, next) => {
  const { path } = ctx
  return router.routes()(ctx, next)
}

module.exports = { register, middleware }
