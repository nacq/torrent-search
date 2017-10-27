const scrapeIt = require('scrape-it')
const tpbConfig = require('../config/sites/tpb')

function getResults(sites, search) {
    return new Promise((resolve, reject) => {
        scrapeIt(tpbConfig.url(search), tpbConfig.scrapeConfig)
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
