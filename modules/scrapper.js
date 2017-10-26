const scrapeIt = require('scrape-it')
const tpbConfig = require('../config/sites/tpb')

function getResults(sites, search) {
    const url = `https://proxyproxyproxy.nl/s/?q=${encodeURIComponent(search)}&page=0&orderby=99`

    return new Promise((resolve, reject) => {
        scrapeIt(url, tpbConfig)
        .then(data => resolve(data.result))
        .catch(err => {
          console.log(err)

          reject(err)
        })
    })
}

module.exports = {
    getResults: getResults
}
