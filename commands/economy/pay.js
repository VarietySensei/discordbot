const economy = require('../../economy')

module.exports = {
  commands: 'pay',
  minArgs: 2,
  maxArgs: 2,
  expectedArgs: "<Target user's @> <Amount of credits>",
  callback: async (message, arguments, text) => {
    const { guild, member } = message

    const target = message.mentions.users.first()
    if (!target) {
      message.reply('Please specify someone to give credits to.')
      return
    }

    const creditsToGive = arguments[1]
    if (isNaN(creditsToGive)) {
      message.reply('Please provide a valid number of credits to give.')
      return
    }

    const creditsOwned = await economy.getcredits(guild.id, member.id)
    if (creditsOwned < creditsToGive) {
      message.reply(`You do not have ${creditsToGive} credits!`)
      return
    }

    const remainingcredits = await economy.addcredits(
      guild.id,
      member.id,
      creditsToGive * -1
    )
    const newBalance = await economy.addcredits(guild.id, target.id, creditsToGive)

    message.reply(
      `You have given <@${target.id}> ${creditsToGive} credits! They now have ${newBalance} credits and you have ${remainingcredits} credits!`
    )
  },
}