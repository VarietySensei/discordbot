const mongo = require('./mongo')
const profileSchema = require('./schemas/profile-schema')

const creditsCache = {} // { 'guildId-userId': credits }

module.exports = (client) => {}

module.exports.addcredits = async (guildId, userId, credits) => {
  return await mongo().then(async (mongoose) => {
    try {
      console.log('Running findOneAndUpdate()')

      const result = await profileSchema.findOneAndUpdate(
        {
          guildId,
          userId,
        },
        {
          guildId,
          userId,
          $inc: {
            credits,
          },
        },
        {
          upsert: true,
          new: true,
        }
      )

      console.log('RESULT:', result)

      creditsCache[`${guildId}-${userId}`] = result.credits

      return result.credits
    } finally {
      mongoose.connection.close()
    }
  })
}

module.exports.getcredits = async (guildId, userId) => {
  const cachedValue = creditsCache[`${guildId}-${userId}`]
  if (cachedValue) {
    return cachedValue
  }

  return await mongo().then(async (mongoose) => {
    try {
      console.log('Running findOne()')

      const result = await profileSchema.findOne({
        guildId,
        userId,
      })

      console.log('RESULT:', result)

      let credits = 0
      if (result) {
        credits = result.credits
      } else {
        console.log('Inserting a document')
        await new profileSchema({
          guildId,
          userId,
          credits,
        }).save()
      }

      creditsCache[`${guildId}-${userId}`] = credits

      return credits
    } finally {
      mongoose.connection.close()
    }
  })
}