const exec = require('child_process').exec
const inquirer = require('inquirer')
const promptsConfig = require('./config/prompts')
const scrapper = require('./modules/scrapper')
const prompts = [promptsConfig.sites, promptsConfig.questions]

process.stdout.write('\033c')
inquirer.prompt(prompts)
.then(answer => {
    return scrapper.getResults(answer.sites, answer.search)
})
.then(results => {
    return inquirer.prompt(promptsConfig.results(results))
})
.then(torrentSelected => {
    let open
    switch (process.platform) {
        case 'linux':
            // TO-DO: maybe in some GNU/Linux distribution xdg-open don't work...
            open = 'xdg-open'
            break
        case 'win32':
            open = 'start'
            break
        default:
            open = 'open'
            break
    }
    exec(`${open} ${torrentSelected.magnetLink}`)
})
.catch(err => {
    console.log(err)
})
