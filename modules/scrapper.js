const sitesConfig = require('../config/sites')
const scrapeIt = require('scrape-it')

function getResults(sites, search) {
    const sitesToScrap = sites.map(site => {
        const siteConfig = sitesConfig(site)

        return scrapeIt(siteConfig.url(search), siteConfig.scrapeConfig)
    })

    return new Promise(resolve => {
        Promise.all(sitesToScrap)
        .then(scrapedSitesData => {
            let results = []

            scrapedSitesData.forEach(scrapedSiteData => {
                results = results.concat(scrapedSiteData.result)
            })

            resolve(results)
        })
    })
}

module.exports = {
    getResults: getResults
}
