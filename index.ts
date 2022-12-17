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
    client.application?.commands.set(Commands.map((value) => value.command))
})

client.on('interactionCreate', async (interaction) => {
    if (interaction.isChatInputCommand()){
        interaction.client.application.commands.set

        const slashCommand = Commands.find(c => c.command.name === interaction.commandName);
        if (!slashCommand) {
            interaction.followUp({ content: "An error has occurred" });
            return;
        }
        slashCommand.execute(client, interaction);
    }
    else{
        return
    }

    
})

client.on('messageCreate', (message) => {
    if (message.content === 'ping'){
        message.reply({
            content: "pong",
        })
    }
})

client.login(process.env.TOKEN)