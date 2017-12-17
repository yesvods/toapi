const toapi = require('../src/index')

toapi.start(2233, {
  waitUntil: 'domcontentloaded',
})

toapi.register({
  routeName: '/list/:key',
  matchUrl:
    'https://www.lagou.com/jobs/list_:key?labelWords=&fromSearch=true&suginput=',
  selector: require('./searchSelector'),
  waitUntil: 'load',
})

toapi.register({
  routeName: '/job/:id',
  matchUrl: 'https://www.lagou.com/jobs/:id.html',
  selector: require('./detailSelector'),
})

// Or Just provide matchUrl only:
// then visit /jobs/xx.html will get spec job api
//
// toapi.register({
//   matchUrl: 'https://www.lagou.com/jobs/:id.html',
//   selector: selector,
// })
