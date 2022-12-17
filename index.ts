import { GatewayIntentBits } from 'discord-api-types/v10'
import DiscordJs from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()

const client = new DiscordJs.Client({
    intents: [
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent
    ]
})

client.on('ready', () => {
    console.log('The bot is ready')
})

client.on('messageCreate', (message) => {
    if (message.content === 'ping'){
        message.reply({
            content: "pong",
        })
    }
})

client.login(process.env.TOKEN)