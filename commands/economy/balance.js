const { User } = require('discord.js')
const economy = require('../../economy')

module.exports = {
  commands: ['balance', 'bal'],
  minArgs: 0,
  maxArgs: 1,
  expectedArgs: "[Target user's @]",
  callback: async (message, user) => {
    const target = message.mentions.users.first() || message.author
    const targetId = target.id

    const guildId = message.guild.id
    const userId = target.id

    const credits = await economy.getcredits(guildId, userId)

    message.channel.send(`<@${target.id}> has ${credits} credits!`)
  },
}