'use strict'
// Usage: node examples/npm-module-github-stats.js [packages...]
// Example: node examples/npm-module-github-stats.js express penguin mongoose
const https = require('https')

const line = require('../')

// Define a reusable line
var getJSON = line([
  // Request package info from npmjs (async, returns a readable stream)
  // We void return value so the library wait for callback instead of taking https.get result as the resolved value
  (url, done) => void https.get(url, (res) => done(null, res)),
  // Convert to JSON (sync)
  (data) => JSON.parse(data)
])

// Another reusable line that uses the above, and is used below
var getStats = line([
  (f) => getJSON(`https://api.npmjs.org/downloads/point/last-${f}`),
  (val) => (val.downloads > 1000 ? Math.round((val.downloads) / 1000) + 'K' : val.downloads) || '?'
])

var l = line([
  // getJSON and getStats are precomposed lines
  { // A split, that uses lines internally
    npm: (pkg) => getJSON(`https://registry.npmjs.com/${pkg}`),
    stats: { // A nested split... Because why not!
      day: (pkg) => getStats(`day/${pkg}`),
      week: (pkg) => getStats(`week/${pkg}`),
      month: (pkg) => getStats(`month/${pkg}`)
    }
  },
  // passes on the github repo, or throws an error (return a promise)
  function (data, done) {
    this.npm = data.npm // save to shared context
    this.stats = data.stats
    var m = data.npm.repository.url.match(/:\/\/github.com\/([^/]+\/[^/]+)/i)
    if (!m) {
      // We can just return null (not undefined), without using done() callback
      // If nothing was returned (typeof == undefined), library will wait for an async callback to resolve
      // return null
      return done(null, null)
    }
    // Read data from github
    var gitHubRepo = m[1].replace(/\.git$/i, '')
    https.get({
      host: 'api.github.com',
      path: `/repos/${gitHubRepo}`,
      headers: { 'User-Agent': 'https://github.com/etabits/node-line' }
    }, (res) => done(null, res))
  },
  // Sum up!
  function (githubJSON) {
    this.gh = githubJSON ? JSON.parse(githubJSON) : false
    return this // return shared context
  }
])

// Read command line arguments
var packages = process.argv.slice(2)
// defaults
if (!packages.length) {
  packages = ['ava', 'coveralls', 'jshint', 'nyc', 'standard']
}
// run
for (let pkg of packages) {
  l(pkg).then(printer).catch(dog)
}
// printer
function printer (info) {
  console.log(`Package [${info.npm.name}](${info.npm.homepage}): ${info.npm.description}\n`,
    `Has ${Object.keys(info.npm.users).length} users, as reported by npm\n`,
    `Downloads: ${info.stats.day}/${info.stats.week}/${info.stats.month} (day/week/month)`)
  if (info.gh) {
    console.log(` Has ${info.gh.stargazers_count} stargazers, ${info.gh.subscribers_count} watchers,`,
    `${info.gh.forks} forks and ${info.gh.open_issues} open issues`)
  } else {
    console.log(' No github info could be retrieved!')
  }
  console.log()
}
// error logger, just in case!
function dog (reason) {
  console.error(reason)
}
