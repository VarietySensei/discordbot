const path = require('path')
const fs = require('fs')
const Discord = require('discord.js')
const {prefix, token} = require('./config')
const client = new Discord.Client()
const mongo = require('./mongo')
const WOKCommands = require('wokcommands')


client.commands = new Discord.Collection();

client.on('ready', async () => {
    console.log('The client is ready!')

    const levels = require('./levels')
    levels(client)
    
    await mongo().then(mongoose => {
        try{
            console.log('connected to mongo')
        } finally {
            mongoose.connection.close()
        }
    })

    const baseFile = 'commandBase.js'
    const commandBase = require(`./commands/${baseFile}`)

    console.log(`Logged in as ${client.user.tag}!`);

    const readCommands = (dir) => {
        const files = fs.readdirSync(path.join(__dirname, dir))
        for (const file of files) {
        const stat = fs.lstatSync(path.join(__dirname, dir, file))
        if (stat.isDirectory()) {
            readCommands(path.join(dir, file))
        } else if (file !== baseFile) {
            const option = require(path.join(__dirname, dir, file))
            commandBase(client, option)
        }
        }
    } 

    readCommands('commands')
})

    

client.login(token)
