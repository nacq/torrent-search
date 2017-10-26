const exec = require('child_process').exec
const inquirer = require('inquirer')
const promptsConfig = require('./config/prompts')
const scrapper = require('./modules/scrapper')
const prompts = [promptsConfig.sites, promptsConfig.questions]

inquirer.prompt(prompts)
.then(answer => {
    return scrapper.getResults(answer.sites, answer.search)
})
.then(results => {
    return inquirer.prompt(promptsConfig.results(results))
})
.then(torrentSelected => {
    // only macos
    exec(`open ${torrentSelected.magnetLink}`)
})
.catch(err => {
    console.log(err)
})
