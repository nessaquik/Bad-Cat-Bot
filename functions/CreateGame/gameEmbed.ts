import { TextChannel, EmbedBuilder, ActionRowBuilder, ButtonBuilder, Message, ButtonInteraction, Client, APIEmbedField, Channel } from "discord.js";
import { AddButton } from "../../buttons/_buttons";
import { CreateGameEmbedConstants } from "../../constants/createGame";
import { ApplyGameButtonConstants, PauseGameButtonConstants, PlayGameButtonConstants, EditGameButtonConstants } from "../../constants/gameApplication";
import { GlobalConstants } from "../../constants/global";
import dotenv from 'dotenv';
import { getCustomId, isDM } from "../_Base/commonMethods";
dotenv.config()

export function getGameValues(message: Message) {
    //Info: Just leave this one to it's special case. 
    const embed = message.embeds[0]
    var retVal = [embed.title!, embed.description!]
    embed.fields.forEach((value) => retVal.push(value.value))
    return retVal
}

export function getEmbedDetails(message: Message) {
    const embed = message.embeds[0]
    let fieldsMap = new Map<string, string>();
    for (var field of embed.fields){
        fieldsMap.set(field.name, field.value);
    }

    var gameEmbedDetails: GameEmbedDetails = {
        name: embed.title!,
        description: embed.description!,
        dm: fieldsMap.get(CreateGameEmbedConstants.DM)!,
        template: fieldsMap.get(CreateGameEmbedConstants.GAME_DETAILS)!,
        questions:fieldsMap.get(CreateGameEmbedConstants.APPLICATION)!,
        role: fieldsMap.get(CreateGameEmbedConstants.ROLE)!,
        channel: fieldsMap.get(CreateGameEmbedConstants.CHANNEL)!,
        acceptedUserCount: parseInt(fieldsMap.get(CreateGameEmbedConstants.ACCEPTED_COUNT)!),
        aboutDMMessage: fieldsMap.get(CreateGameEmbedConstants.ABOUT_DM)!,
        discussionThreadUrl: embed.url!,
    }
    return gameEmbedDetails;
}

export async function sendGameEmbed(channel: TextChannel,
    gameName: string,
    desc: string,
    template: string,
    questions: string,
    dm: string,
    role: string,
    gameChannel: Channel | null,
    applicationThreadId: string,
    aboutDMURL: string,
    threadURL: string) {

    const game: GameEmbedDetails = {
        name: gameName,
        description: desc,
        dm: dm,
        template: template,
        questions:questions,
        role: role,
        channel: gameChannel ? gameChannel.toString() : CreateGameEmbedConstants.UNAVAILABLE,
        acceptedUserCount: 0,
        aboutDMMessage: aboutDMURL,
        discussionThreadUrl: threadURL,
    }

    const embed= buildEmbed(game)
    const buttons = applicationEnabledButtons(applicationThreadId);
    await channel.send({ embeds: [embed], components: buttons })
}

export async function editGameEmbed(message: Message,
    gameName: string,
    desc: string,
    template: string,
    questions: string) {
    const game = getEmbedDetails(message)
    game.name = gameName
    game.description = desc
    game.template = template
    game.questions = questions

    const embed= buildEmbed(game)
    await message.edit({embeds: [embed]})
}

export async function changeAcceptedCount(message: Message, increment: boolean) {
    const game = getEmbedDetails(message)
    game.acceptedUserCount = game.acceptedUserCount + (increment ? 1 : -1)
    const embed= buildEmbed(game)
    await message.edit({embeds: [embed]})
}

export async function editEmbedState(
    interaction: ButtonInteraction,
    pause: boolean){
    var customid = getCustomId(interaction.message)
    var buttons = pause ? applicationPausedButtons(customid) : applicationEnabledButtons(customid)
    await interaction.message.edit({components: buttons})
}


//!-------------------------------Private Methods-------------------------------!

function buildEmbed(embedDetails: GameEmbedDetails){  
    var fields: APIEmbedField[] =  [
        { name: CreateGameEmbedConstants.DM, value: embedDetails.dm },
        { name: CreateGameEmbedConstants.GAME_DETAILS, value: embedDetails.template },
        { name: CreateGameEmbedConstants.APPLICATION, value: embedDetails.questions },
        { name: CreateGameEmbedConstants.ABOUT_DM, value: embedDetails.aboutDMMessage ? "["+CreateGameEmbedConstants.ABOUT_DM_MESSAGE+"]("+embedDetails.aboutDMMessage+")" : CreateGameEmbedConstants.UNAVAILABLE },
        { name: CreateGameEmbedConstants.THREAD, value: "["+CreateGameEmbedConstants.SEE_DISCUSSION_THREAD+"]("+embedDetails.discussionThreadUrl+")" }];

    if (embedDetails.role){
        fields = fields.concat(
        { name: "\u200B", value: "\u200B"},
        { name: CreateGameEmbedConstants.CHANNEL, value: embedDetails.channel, inline: true },
        { name: CreateGameEmbedConstants.ACCEPTED_COUNT, value: embedDetails.acceptedUserCount.toString(), inline: true },
        { name: CreateGameEmbedConstants.ROLE, value: embedDetails.role, inline: true })
    }

    return new EmbedBuilder()
        .setTitle(embedDetails.name)
        .setColor(CreateGameEmbedConstants.EMBED_COLOR)
        .setDescription(embedDetails.description)
        .setThumbnail(GlobalConstants.THUMBNAIL)
        .setURL(embedDetails.discussionThreadUrl)
        .addFields(...fields)
        .setTimestamp()
        .setFooter({ text: CreateGameEmbedConstants.FOOTER})
}

function applicationEnabledButtons(applicationThreadId: string){
    var applyButton = AddButton(ApplyGameButtonConstants.ID, undefined, undefined, applicationThreadId)
    var editButton = AddButton(EditGameButtonConstants.ID, undefined, undefined, undefined)
    var pauseButton = AddButton(PauseGameButtonConstants.ID, undefined, undefined, undefined)
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents([applyButton!, editButton!]);
    const row2 = new ActionRowBuilder<ButtonBuilder>().addComponents([pauseButton!]);
    return [row,row2]
}

function applicationPausedButtons(applicationThreadId: string){
    var applyButton = AddButton(ApplyGameButtonConstants.ID, undefined, undefined, applicationThreadId)
    applyButton?.setDisabled(true)
    applyButton?.setLabel(ApplyGameButtonConstants.PAUSED_TITLE)
    var editButton = AddButton(EditGameButtonConstants.ID, undefined, undefined, undefined)
    var playButton = AddButton(PlayGameButtonConstants.ID, undefined, undefined, undefined)    
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents([applyButton!, editButton!]);
    const row2 = new ActionRowBuilder<ButtonBuilder>().addComponents([playButton!]);
    return [row,row2]
}

export interface GameEmbedDetails {
    name: string;
    description: string;
    dm: string;
    template: string;
    questions: string;
    role: string;
    channel: string,
    acceptedUserCount: number,
    aboutDMMessage: string,
    discussionThreadUrl: string,
}