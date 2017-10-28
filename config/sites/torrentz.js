const urlBase = 'https://torrentz2.eu'

module.exports = {
    url: (search) => {
        return `${urlBase}/search?f=${encodeURIComponent(search)}`
    },
    scrapeConfig: {
        result: {
            listItem: ".results dl",
            data: {
                name: "dt a",
                size: {
                    selector: "dd span:nth-child(3)"
                },
                seeders: {
                    selector: "dd span:nth-child(5)"
                },
                leechers: {
                    selector: "dd span:nth-child(4)"
                },
                link: {
                    selector: "dt a",
                    attr: "href",
                    convert: x => `${urlBase}${x}`
                }
            }
        }
    }
}
