import { CategoryChannel, ChannelType, ChatInputCommandInteraction, Guild, TextChannel } from "discord.js";
import { CreateGameChannelConstants } from "../../constants/createGame";
import dotenv from 'dotenv';
dotenv.config()

export async function createGameLocation(interaction: ChatInputCommandInteraction,
    gameFormat: string, 
    name: string,
    role: string){ 
    var channel
    
    //Create One shot channel
    if (gameFormat.toLowerCase().indexOf("oneshot") !== -1 && interaction.guild != null) { 
        console.log("Creating channel")
        channel = await createOneshotChannel(interaction.guild, name, role)
        console.log("Channel created for "+name)
    }

    //Create campaign category if not ongoing
    else if (gameFormat.toLowerCase().indexOf("ongoing") == -1 && interaction.guild != null) { 
        console.log("Creating campaign category")
        channel = await createCampaignChannel(interaction.guild, name, role)
        console.log("Category created for "+name)
    }

    return channel;
}

async function createOneshotChannel(guild: Guild, gameName: string, roleName: string){
    var channel = await guild.channels.create({
        name: gameName,
        type: ChannelType.GuildText,
        parent: process.env.CHANNELPARENTID,
    });
    setChannelPermissions(guild, roleName, channel)
    return channel    
}

async function createCampaignChannel(guild: Guild, gameName: string, roleName: string){
    var channel = await guild.channels.create({
        name: gameName,
        type: ChannelType.GuildCategory
    });
    setChannelPermissions(guild, roleName, channel)
    var oocChannel = await guild.channels.create({
        name: CreateGameChannelConstants.CHANNEL_NAME,
        type: ChannelType.GuildText,
        parent: channel.id
    });
    return oocChannel    
}

async function setChannelPermissions(guild: Guild, roleName: string, channel: TextChannel | CategoryChannel){
    var role = guild?.roles.cache.find(role => role.name === roleName)
    await channel.permissionOverwrites.edit(channel.guild.roles.everyone, { ViewChannel: false, SendMessages: false });
    if (role != null){
        await channel.permissionOverwrites.edit(role, { ViewChannel: true, SendMessages: true });
    }
}