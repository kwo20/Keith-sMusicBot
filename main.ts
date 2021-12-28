import { PlayerSubscription } from '@discordjs/voice';
import DiscordJS, { Channel, Intents, Message, MessageComponentInteraction, MessageReaction, VoiceChannel } from 'discord.js'
import dotenv from 'dotenv'

dotenv.config()
const { joinVoiceChannel, createAudioPlayer, createAudioResource, generateDependencyReport, getVoiceConnection } = require('@discordjs/voice');
const player = createAudioPlayer();
const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_VOICE_STATES
    ]
})


const ytdl = require('ytdl-core');

client.on('ready', ()=>{
    console.log("bot ready");
})

client.on('messageCreate', (message)=>{
    
    if(message.content.startsWith("!play"))
    {
        
        const args = message.content.split(/ +/);
        const url = args[1];
        const stream = ytdl(url, {filter: 'audioonly'});
        const resource = createAudioResource(stream);
        const GuildMember = message.author.id;
        const connection = joinVoiceChannel({
            channelId: '924802429864792087',
            guildId: '924802429109813309',
            adapterCreator: message.guild?.voiceAdapterCreator
        })
        connection.subscribe(player);
        player.play(resource);
        console.log(generateDependencyReport());
    }   
    else if(message.content === "!pause")
    {
        player.pause();
    }
    else if(message.content === "!unpause")
    {
        player.unpause();
    }
    else if(message.content === "!leave")
    {
        const connection = getVoiceConnection('924802429109813309');
        connection.destroy();
        console.log("made it to leave");
    }

})


client.login(process.env.TOKEN)
