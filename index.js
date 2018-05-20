#!/bin/node
const exec = require('child_process').exec
const inquirer = require('inquirer')
const promptsConfig = require('./config/prompts')
const scrapper = require('./modules/scrapper')
const prompts = [promptsConfig.sites, promptsConfig.questions]
const argv = require('minimist')(process.argv.slice(2))

process.stdout.write('\033c')

inquirer.prompt(prompts)
.then(answer => scrapper.getResults(answer.sites, answer.search))
.then(results => inquirer.prompt(promptsConfig.results(results)))
.then(torrentSelected => {
    let open = typeof argv.c == 'string' && argv.c || typeof argv.client == 'string' && argv.client

    if (!open) {
        switch (process.platform) {
        case 'linux':
            // TO-DO: maybe in some GNU/Linux distribution xdg-open won't work...
            open = 'xdg-open'
            break
        case 'win32':
            open = 'start'
            break
        default:
            open = 'open'
            break
        }
    }
    exec(`${open} ${torrentSelected.magnetLink}`)
})
.catch(err => {
    console.log(err)
})
