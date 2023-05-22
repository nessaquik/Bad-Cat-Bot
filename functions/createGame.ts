import { ChatInputCommandInteraction, ModalSubmitInteraction, TextChannel, ChannelType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Message, Guild } from "discord.js";
import { PauseGame } from "../buttons/pauseApplications";
import { AddButton } from "../buttons/_buttons";
import { CreateGameEmbedConstants, CreateGameThreadConstants, CreateGameChannelConstants } from "../constants/createGame";
import { CREATE_GAME_TEMPLATE_VALUES, EXTRACT_GAME_VALUES, GAME_DETAILS_SEPARATOR } from "../constants/createGameDescription";
import { GameApplicationEmbedConstants, AcceptApplicationButtonConstants, RejectApplicationButtonConstants, ApplyGameButtonConstants, PauseGameButtonConstants, PlayGameButtonConstants, EditGameButtonConstants } from "../constants/gameApplication";
import { GlobalConstants } from "../constants/global";
import dotenv from 'dotenv'
dotenv.config()

export async function createDiscussionThread(channel: TextChannel,
    gameName: string,
    dm: string) {
    const thread = await channel?.threads.create({
        name: CreateGameThreadConstants.DISCUSSION_THREAD_NAME + gameName,
    })
    await thread.members.add(dm)
    return thread.url
}

export async function createApplicationThread(channel: TextChannel,
    gameName: string,
    dm: string,
    role: string,
    questions: string,
    ispublic: boolean) {
    const thread = await channel?.threads.create({
        name: CreateGameThreadConstants.APPLICATION_THREAD_NAME + gameName,
        type: ispublic ? ChannelType.PublicThread : ChannelType.PrivateThread,
    })
    await thread.members.add(dm);

    //NOTE: This is read in getGameValues. Don't modify without changing that function
    //This is just a cheap ass way of saving DB money
    var message = await thread.send(["0", gameName, dm, role, questions].join('\n'))
    return [thread.id, message.id].join(GlobalConstants.ID_SEPARATOR)
}

export async function sendGameEmbed(channel: TextChannel,
    gameName: string,
    desc: string,
    template: string,
    questions: string,
    dm: string,
    detailsId: string,
    threadURL: string
) {
    const embed = new EmbedBuilder()
        .setTitle(gameName)
        .setColor(CreateGameEmbedConstants.EMBED_COLOR)
        .setDescription(desc)
        .setThumbnail(GlobalConstants.THUMBNAIL)
        .setURL(threadURL)
        .addFields(
            { name: CreateGameEmbedConstants.DM, value: dm },
            { name: CreateGameEmbedConstants.GAME_DETAILS, value: template },
            { name: CreateGameEmbedConstants.APPLICATION, value: questions },
            { name: CreateGameEmbedConstants.THREAD, value: "[See Discussion Thread]("+threadURL+")" },
        )
        .setTimestamp()
        .setFooter({ text: CreateGameEmbedConstants.FOOTER})

    var applyButton = AddButton(ApplyGameButtonConstants.ID, undefined, undefined, detailsId)
    var editButton = AddButton(EditGameButtonConstants.ID, undefined, undefined, detailsId)
    var pauseButton = AddButton(PauseGameButtonConstants.ID, undefined, undefined, detailsId)
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents([applyButton!, editButton!]);
    const row2 = new ActionRowBuilder<ButtonBuilder>().addComponents([pauseButton!]);

    await channel.send({ embeds: [embed], components: [row!, row2!] })
}

export async function editGameEmbed(message: Message,
    gameName: string,
    desc: string,
    template: string,
    questions: string,
    dm: string
) {
    const url = message.embeds[0].url
    const embed= new EmbedBuilder()
        .setTitle(gameName)
        .setColor(CreateGameEmbedConstants.EMBED_COLOR)
        .setDescription(desc)
        .setThumbnail(GlobalConstants.THUMBNAIL)
        .setURL(url)
        .addFields(
            { name: CreateGameEmbedConstants.DM, value: dm },
            { name: CreateGameEmbedConstants.GAME_DETAILS, value: template },
            { name: CreateGameEmbedConstants.APPLICATION, value: questions },
            { name: CreateGameEmbedConstants.THREAD, value: "[See Discussion Thread]("+url+")" },
        )
        .setTimestamp()
        .setFooter({ text: CreateGameEmbedConstants.FOOTER})

    await message.edit({embeds: [embed]})
}

export function getGameEmbed(message: Message) {
    const embed = message.embeds[0]
    var retVal = [embed.title!, embed.description!]
    embed.fields.forEach((value) => retVal.push(value.value))
    return retVal
}

export async function pauseGame(message: Message, detailsId: string){
    var applyButton = AddButton(ApplyGameButtonConstants.ID, undefined, undefined, detailsId)
    applyButton?.setDisabled(true)
    applyButton?.setLabel(ApplyGameButtonConstants.PAUSED_TITLE)
    var editButton = AddButton(EditGameButtonConstants.ID, undefined, undefined, detailsId)
    var playButton = AddButton(PlayGameButtonConstants.ID, undefined, undefined, detailsId)    
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents([applyButton!, editButton!]);
    const row2 = new ActionRowBuilder<ButtonBuilder>().addComponents([playButton!]);

    await message.edit({components: [row!, row2!]})
}

export async function playGame(message: Message, detailsId: string){
    var applyButton = AddButton(ApplyGameButtonConstants.ID, undefined, undefined, detailsId)
    var editButton = AddButton(EditGameButtonConstants.ID, undefined, undefined, detailsId)
    var pauseButton = AddButton(PauseGameButtonConstants.ID, undefined, undefined, detailsId)    
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents([applyButton!, editButton!]);
    const row2 = new ActionRowBuilder<ButtonBuilder>().addComponents([pauseButton!]);

    await message.edit({components: [row!, row2!]})
}


export async function addUserToChannel(userId: string, channel: TextChannel){
    await channel.permissionOverwrites.edit(userId, { ViewChannel: true, SendMessages: true });
}

export function getGameFormat(gameDetails: string){
    var gameDetailsList = gameDetails.split('\n')
    for (var detail of gameDetailsList){
        if (detail.includes(EXTRACT_GAME_VALUES.FORMAT)){
            return detail.replace(EXTRACT_GAME_VALUES.FORMAT, "").replace(/[^a-zA-Z0-9]/g, '')
        }
    }
    return ""
}

export async function createOneshotChannel(guild: Guild, gameName: string, roleName: string){
    var channel = await guild.channels.create({
        name: gameName,
        type: ChannelType.GuildText,
        parent: process.env.CHANNELPARENTID,
    });
    var role = guild?.roles.cache.find(role => role.name === roleName)
    await channel.permissionOverwrites.edit(channel.guild.roles.everyone, { ViewChannel: false, SendMessages: false });
    if (role != null){
        await channel.permissionOverwrites.edit(role, { ViewChannel: true, SendMessages: true });
    }
    return channel    
}

export async function createCampaignChannel(guild: Guild, gameName: string, roleName: string){
    var channel = await guild.channels.create({
        name: gameName,
        type: ChannelType.GuildCategory
    });
    var role = guild?.roles.cache.find(role => role.name === roleName)
    await channel.permissionOverwrites.edit(channel.guild.roles.everyone, { ViewChannel: false, SendMessages: false });
    if (role != null){
        await channel.permissionOverwrites.edit(role, { ViewChannel: true, SendMessages: true });
    }
    var oocChannel = await guild.channels.create({
        name: CreateGameChannelConstants.CHANNEL_NAME,
        type: ChannelType.GuildText,
        parent: channel.id
    });
    return oocChannel    
}