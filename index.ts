import { GatewayIntentBits } from 'discord-api-types/v10';
import DiscordJs, { Events } from 'discord.js';
import dotenv from 'dotenv';
import { Commands } from './commands/_commands';
import { GlobalConstants } from './constants/global';
import { Buttons } from './buttons/_buttons';
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

    const guild = client.guilds.cache.get(process.env.GUILDID || '')    
    if (guild) {
        guild.commands.set(Array.from(Commands.values()).map((value) => value.command))
    }
    else{
        client.application?.commands.set(Array.from(Commands.values()).map((value) => value.command))
    }

    console.log('Commands are registered')
})

client.on('interactionCreate', async (interaction) => {
    if (interaction.isChatInputCommand() || interaction.isButton()){
        await interaction.reply({
            content: GlobalConstants.WELCOME,
            ephemeral: true
        })
    }
    // else if (interaction.isChatInputCommand()){
    //     try{
    //         const slashCommand = Commands.get(interaction.commandName);
    //         if (!slashCommand) {
    //             interaction.followUp({ content: GlobalConstants.ERROR });
    //             return;
    //         }
    //         await slashCommand.execute(client, interaction);
    //     }
    //     catch(e){
    //         await interaction.reply({
    //             content: GlobalConstants.ERROR,
    //             ephemeral: true
    //         })
    //     }
    // }
    // else if (interaction.isButton()){
    //     try{
    //         const id = interaction.customId.split(GlobalConstants.ID_SEPARATOR)[0]
    //         const button = Buttons.get(id);
    //         if (!button) {
    //             interaction.followUp({ content: GlobalConstants.ERROR });
    //             return;
    //         }
    //         await button?.execute(client, interaction)
    //     }
    //     catch(e){
    //         console.error(e)
    //         await interaction.reply({
    //             content: GlobalConstants.ERROR,
    //             ephemeral: true
    //         })
    //     }
    // }
    else {
        return
    }    
})

client.on(Events.MessageCreate, async (message) => {
    if (message.mentions != null && message.mentions.users != null && !message.author.bot){
        message.mentions.users.forEach(async (user) => {
            if (user.id==client.user?.id || user.id == GlobalConstants.RIVKA_ID){
                message.reply({content: GlobalConstants.WELCOME})
            }
        });
    }
})

client.login(process.env.TOKEN)