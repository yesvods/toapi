## Toapi

Make Every website provides APIs.

![](docs/imgs/api.png)

## Introduction

Topapi is a supper slight server framework, which provide one way to ask for every website to provide apis.

We don't need to climb the website day by day. Because they should provide the API we need!

All we need is a Temme snippet.

## Architecture

Toapi provide multi cache for every page u visit. So, don't worry about u make a huge trivial ddos like to the website.

![](docs/imgs/diagram.png)

## Get Started

### Instsll

```bash
git clone git@github.com:yesvods/toapi.git
npm install
```

### Start Example

```bash
npm start
# then visit localhost:3000/job/3616345
```

That's all, can't be simple much more.

## NPM

Install the NPM module:

```
npm install toapi
```

### Usage

Let's say we need to visit the job detail `API` of `lagou`.

Such as `https://www.lagou.com/jobs/3616345.html`

We just write a temme selector like:

```
...
.job_company@company {
  .fl{find($name|fp, '拉勾认证企业')}
  .c_feature li:nth-child(1){find($domain|fp, '领域')}
  .c_feature li:nth-child(2){find($stage|fp, '发展阶段')}
  .c_feature li:nth-child(3){find($size|fp, '规模')}
  .c_feature li:nth-child(4) a[href=$link];
}
...
```

And then `register` it!

```js
const toapi = require('toapi')

toapi.register({
  routeName: '/job/:id',
  matchUrl: 'https://www.lagou.com/jobs/:id.html',
  selector: selector,
})

toapi.start(3000)
```

All things are done, enjoy ur website swimming.
