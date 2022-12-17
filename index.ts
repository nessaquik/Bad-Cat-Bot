import { GatewayIntentBits } from 'discord-api-types/v10'
import DiscordJs, { Collection } from 'discord.js'
import path from "path";
import dotenv from 'dotenv'
import { Commands } from './commands/_commands';
dotenv.config()

const client = new DiscordJs.Client({
    intents: [
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
    ]
})

client.on('ready', () => {
    console.log('The bot is ready')

    const guildId = '1053562587024982017'
    const guild = client.guilds.cache.get(guildId)
    
    if (guild) {
        guild.commands.set(Commands.map((value) => value.command))
    }
    else{
        client.application?.commands.set(Commands.map((value) => value.command))
    }    
    console.log('Commands are registered')
})

client.on('interactionCreate', async (interaction) => {
    if (interaction.isChatInputCommand()){
        const slashCommand = Commands.find(c => c.command.name === interaction.commandName);
        if (!slashCommand) {
            interaction.followUp({ content: "An error has occurred. Blame Chava!" });
            return;
        }
        slashCommand.execute(client, interaction);
    }
    else{
        return
    }    
})

client.login(process.env.TOKEN)