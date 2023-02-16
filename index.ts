import { GatewayIntentBits } from 'discord-api-types/v10'
import DiscordJs, { Collection, Events, userMention } from 'discord.js'
import path from "path";
import dotenv from 'dotenv'
import { Commands } from './commands/_commands';
import { GlobalConstants } from './constants/global';
import { Buttons } from './buttons/_buttons';
import { Responses } from './constants/resources';
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
    if (interaction.isChatInputCommand()){
        const slashCommand = Commands.get(interaction.commandName);
        if (!slashCommand) {
            interaction.followUp({ content: GlobalConstants.ERROR });
            return;
        }
        slashCommand.execute(client, interaction);
    }
    else if (interaction.isButton()){
        const id = interaction.customId.split(GlobalConstants.ID_SEPARATOR)[0]
        const button = Buttons.get(id);
        if (!button) {
            interaction.followUp({ content: GlobalConstants.ERROR });
            return;
        }
        button?.execute(client, interaction)
    }
    else{
        return
    }    
})

client.on(Events.MessageCreate, async (message) => {
    if (message.mentions != null && message.mentions.users != null){
        message.mentions.users.forEach(async (user) => {
            if (user.id==process.env.USERID && message.mentions.repliedUser?.id!=process.env.USERID){
                var day = new Date(message.createdTimestamp).getUTCDay()
                if (day == 6){
                    message.reply(Responses.Shabbat)
                }
            }
            // else if (user.id==process.env.ADMINID && message.mentions.repliedUser?.id!=process.env.ADMINID){
            //     message.reply({ content: Responses.Nessa, files: [Responses.NI] })
            // }
        });
    }
})

client.login(process.env.TOKEN)