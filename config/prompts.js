const sites = {
    type: 'checkbox',
    name: 'sites',
    message: 'Sites to search in:',
    choices: [{
        name: 'The Pirate Bay',
        checked: true,
        disabled: false
    }, {
        name: 'Torrentz',
        disabled: false
    }, {
        name: 'RARBG',
        disabled: true
    }, {
        name: 'Kickass Torrents',
        disabled: true
    }, {
        name: 'YIFY',
        disabled: true
    }],
    validate: sitesSelected => {
        return (!sitesSelected.length) ? 'Select at least one site.' : true
    }
}

const questions = {
    type: 'input',
    name: 'search',
    message: 'Search torrent:',
    default: null,
    validate: searchTerm => {
        return (searchTerm === '') ? 'Enter something to search.' : true
    }
}

const results = (searchResults) => {
    let promptResults = {
        type: 'list',
        default: 0,
        name: 'magnetLink',
        message: 'Results:',
        choices: []
    }

    searchResults.forEach(result => {
        const validMagnetLink = (result.magnetLink)
            ? result.magnetLink.match(/magnet:\?xt=urn:[a-z0-9]{20,50}/i)
            : false
        const magnetOrLink = (validMagnetLink) ? `${result.magnetLink}` : `${result.link}`

        promptResults.choices.push({
            name: `${magnetOrLink} | Size: ${result.size}, L/S: ${result.leechers}/${result.seeders}`
        })
    })

    return promptResults
}

module.exports = {
    questions,
    sites,
    results
}
