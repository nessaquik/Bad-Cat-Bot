import { TextChannel, EmbedBuilder, ActionRowBuilder, ButtonBuilder, Message, ButtonInteraction, Client, APIEmbedField } from "discord.js";
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
    gameChannel: TextChannel | undefined,
    applicationThreadId: string,
    threadURL: string) {

    const game: GameEmbedDetails = {
        name: gameName,
        description: desc,
        dm: dm,
        template: template,
        questions:questions,
        role: role,
        channel: gameChannel ? gameChannel.toString() : CreateGameEmbedConstants.UNAVAILABLE,
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
        console.log("game edited now2")
    const game = getEmbedDetails(message)
    game.name = gameName
    game.description = desc
    game.template = template
    game.questions = questions

    console.log("game edited now")

    const embed= buildEmbed(game)
    await message.edit({embeds: [embed]})
}

export async function editApplicationState(
    client: Client, 
    interaction: ButtonInteraction,
    pause: boolean){
        var buttons;
        var game = getEmbedDetails(interaction.message)
        var customid = getCustomId(interaction.message)

        var isOperationAllowed = await isDM(game,interaction)                
        if (isOperationAllowed){
            if (pause){
                //! NEED TO DEPRECATE - Switch to moving channels instead.
                var user = await client.users.fetch(process.env.ADMINID ? process.env.ADMINID : "");
                user.send(PauseGameButtonConstants.MESSAGE + ": " + game.name);

                buttons = applicationPausedButtons(customid)
            }
            else {
                buttons = applicationEnabledButtons(customid)
            }

            await interaction.message.edit({components: buttons})

            await interaction.reply({
                content: pause ? PauseGameButtonConstants.MESSAGE : PlayGameButtonConstants.MESSAGE,
                ephemeral: true
            });
        }
}


//!-------------------------------Private Methods-------------------------------!

function buildEmbed(embedDetails: GameEmbedDetails){  
    var fields: APIEmbedField[] =  [
        { name: CreateGameEmbedConstants.DM, value: embedDetails.dm },
        { name: CreateGameEmbedConstants.GAME_DETAILS, value: embedDetails.template },
        { name: CreateGameEmbedConstants.APPLICATION, value: embedDetails.questions },
        { name: CreateGameEmbedConstants.CHANNEL, value: embedDetails.channel },
        { name: CreateGameEmbedConstants.ROLE, value: embedDetails.role },
        { name: CreateGameEmbedConstants.THREAD, value: "[See Discussion Thread]("+embedDetails.discussionThreadUrl+")" }];

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
    discussionThreadUrl: string,
}