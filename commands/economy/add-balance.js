const economy = require('../../economy')

module.exports = {
  commands: ['addbalance', 'addbal'],
  minArgs: 1,
  maxArgs: 2,
  expectedArgs: "<The target's @> <coin amount>",
  permissionError: 'You must be an administrator to use this command.',
  permissions: 'ADMINISTRATOR',
  callback: async (message, arguments) => {
    const mention = message.mentions.users.first()

    if (!mention) {
      message.reply('Please tag a user to add credits to.')
      return
    }

    const credits = arguments[1]
    if (isNaN(credits)) {
      message.reply('Please provide a valid numnber of credits.')
      return
    }

    const guildId = message.guild.id
    const userId = mention.id

    const newcredits = await economy.addcredits(guildId, userId, credits)

    message.reply(
      `${credits} credits has been added to the bank. They now have ${newcredits} credits!`
    )
  },
}