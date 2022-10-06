const { Client } = require("discord.js")
const { MessageEmbed } = require('discord.js')
const client = new Client({ intents: 32767 })
const config = require("./config")
client.on("ready", () => {
    console.log(`Connected as ${client.user.tag}!`)
    setInterval(() => {
        config.channels.map((id) => {
            const channel = client.channels.cache.get(id)
            const members = channel.guild.members.cache//.filter(mem => mem.user.displayAvatarURL({dynamic: true}).split(".")[3] == 'gif')===========
            const user = members.random().user
            const avatar = user.displayAvatarURL({ dynamic: true, size: 2048 })
            console.log(avatar)
            //if (avatar.split('.')[3].split('?')[0] == 'gif') {=============
                channel.send({
                    embeds: [{
                        author: { iconURL: avatar, name: user.tag },
                        //description: `[GIF](${avatar}) - [GIF](${avatar}) - [GIF](${user.displayAvatarURL({ size: 2048, format: "gif" })}) - [GIF](${avatar})`,
                        footer: { text: "Made by ROИΔK#3937" },
                        image: { url: avatar },
                        color: config.color
                    }]
                })
            //}=============
        })
    }, config.time)
})


client.on("messageCreate", (message) => {
    if (message.author.bot) return false;

    if (message.content.includes("@here") || message.content.includes("@everyone") || message.type == "REPLY") return false;

    /*if (message.mentions.has(client.user.id)) {
        message.channel.send("There are not any commands, the bot only sends the profile picture of random users of guild in a specified channel.");
    }*/
});

client.on("ready", () => {
    client.user.setPresence({
        status: "idle",
        activities: [{
            name: "ROИΔK#3937",
            type: "LISTENING",
        }],
    });

    const { joinVoiceChannel } = require('@discordjs/voice');
    const channel = client.channels.cache.get('1023513652806029352')
    joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
    });

});

client.login(config.token)
