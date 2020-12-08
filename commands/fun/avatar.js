const Discord = require('discord.js');

module.exports = {
    commands: ['avatar', 'profile'],
    permissionError: 'You need admin permissions to run this command',
    minArgs: 0,
    maxArgs: 1,
    callback: (message, arguments, text) => {
        const embed = new Discord.MessageEmbed()
        const target = message.mentions.users.first() || message.author
        const targetId = target.id

        if(message.mentions.users.first()){
    
          embed.setTitle(`Avatar View:`)
          embed.setDescription(`This is <@${target.id}>'s avatar`)
          embed.setColor(0xff0000)
          embed.setImage(target.displayAvatarURL());
        return message.channel.send(embed);
        
        } else {
              
          embed.setTitle(`Avatar View:`)
          embed.setDescription(`This is <@${target.id}>'s avatar`)
          embed.setColor(0xff0000)
          embed.setImage(target.displayAvatarURL());
        return message.channel.send(embed);

        }
    },
}