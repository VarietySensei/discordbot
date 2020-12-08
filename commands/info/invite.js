const Discord = require('discord.js');

module.exports = {
    commands: ['invite'],
    minArgs: 0,
    maxArgs: 1,
    callback: (message, arguments, text) => {
        const embed = new Discord.MessageEmbed()

        if(message.mentions.users.first()){
    
          embed.setTitle(`Aesthetic DB Server`)
          .setDescription(`https://discord.gg/6Z34S3ReEa`)
          .setImage(`https://i.imgur.com/21X4tSK.jpg`)
          .setThumbnail(`https://i.imgur.com/21X4tSK.jpg`)
          .setColor(0xff0000)
        return message.channel.send(embed);
        
        } else {
              
            embed.setTitle(`Aesthetic DB Server`)
            embed.setDescription(`https://discord.gg/6Z34S3ReEa`)
            embed.setColor(0xff0000)
          return message.channel.send(embed);

        }
    },
}