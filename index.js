const inquirer = require('inquirer')
const promptsConfig = require('./config/prompts')
const scrapper = require('./modules/scrapper')
const torrentStream = require('torrent-stream')
const prompts = [promptsConfig.sites, promptsConfig.questions]

inquirer.prompt(prompts)
.then(answer => {
    return scrapper.getResults(answer.sites, answer.search)
})
.then(results => {
    return inquirer.prompt(promptsConfig.results(results))
})
.then(torrentSelected => {
    console.log(torrentSelected)

    // torrentStream(`magnet:${torrentSelected.magnetLink}`)
    // .on('ready', () => {
        // console.log(torrentStream(`magnet:${torrentSelected}`).files)
    // })
})
.catch(err => {
    console.log(err)
})
