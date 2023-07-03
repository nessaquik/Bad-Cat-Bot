import { ActionRowBuilder, APIEmbedField, ButtonBuilder, EmbedBuilder, Message, TextChannel, User } from "discord.js";
import { AddButton } from "../../buttons/_buttons";
import { CreateGameEmbedConstants } from "../../constants/createGame";
import { GameApplicationEmbedConstants, AcceptApplicationButtonConstants, RejectApplicationButtonConstants, RemovePlayerButtonConstants } from "../../constants/gameApplication";
import { GlobalConstants } from '../../constants/global';
import { ApplicationAction, getCustomId, getIdFromMention } from "../_Base/commonMethods";

export function getApplicationAuthorId(message: Message) {
    const embed = message.embeds[0]
    let fieldsMap = new Map<string, string>();
    for (var field of embed.fields){
        fieldsMap.set(field.name, field.value);
    }
    var userMention = fieldsMap.get(GameApplicationEmbedConstants.SUBMITTED)
    if (userMention){
        return getIdFromMention(userMention)
    }
    return null    
}

export async function gameApplicationEmbed(message: Message,
    user: User,
    thread: TextChannel,
    gameName: string,
    answers: APIEmbedField[]) {
    const embed = new EmbedBuilder()
        .setTitle(GameApplicationEmbedConstants.TITLE + gameName)
        .setColor(GameApplicationEmbedConstants.EMBED_COLOR)
        .setAuthor({ name: user.username, iconURL: user.avatarURL()! })
        .addFields({name: GameApplicationEmbedConstants.SUBMITTED, value: user.toString()})
        .addFields(answers)
        .setTimestamp()
        .setFooter({ text: CreateGameEmbedConstants.FOOTER})

        var buttons = gameApplicationButtons(message.channelId + GlobalConstants.ID_SEPARATOR + message.id)
        await thread.send({ embeds: [embed], components: buttons })

        //Not awaiting this since it is tangential. It's only for recordkeeping, not vital to the process.
        user.send({ embeds: [embed] })
}

export async function postActionApplicationEmbed(action: ApplicationAction, message: Message){
    var customId = getCustomId(message)

    var statusMessage = getApplicationActionStatusField(action)
    var embed = message.embeds[0]
    var hasStatus = false

    for (var field of embed.fields){
        if (field.name == GameApplicationEmbedConstants.STATUS){
            hasStatus = true
            field.value = statusMessage
        }
    }
    
    if (!hasStatus){
        embed.fields.push({ name: "\u200B", value: "\u200B" });
        embed.fields.push({ name: GameApplicationEmbedConstants.STATUS, value: statusMessage });
    }    
    
    if (action == ApplicationAction.Accept){
        const removePlayer = AddButton(RemovePlayerButtonConstants.ID, undefined, undefined, customId)
        var components = [new ActionRowBuilder<ButtonBuilder>().addComponents([removePlayer!])];
        await message.edit({embeds:[embed], components: components}); 
    }
    else{
        await message.edit({embeds:[embed], components: []}); 
    }
    
}

//!-------------------------------Private Methods-------------------------------!

function gameApplicationButtons(customId: string){
    const acceptButton = AddButton(AcceptApplicationButtonConstants.ID, undefined, undefined, customId)
    const rejectButton = AddButton(RejectApplicationButtonConstants.ID, undefined, undefined, customId)
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents([acceptButton!, rejectButton!]);
    return [row!]
}

function getApplicationActionStatusField(action: ApplicationAction){
    if (action == ApplicationAction.Accept){
        return AcceptApplicationButtonConstants.STATUS_MESSAGE
    }
    else if (action == ApplicationAction.Reject){
        return RejectApplicationButtonConstants.STATUS_MESSAGE
    }
    else if (action == ApplicationAction.Remove){
        return RemovePlayerButtonConstants.STATUS_MESSAGE
    }
    else {
        return GlobalConstants.ERROR
    }
}