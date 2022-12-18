import { APIEmbedField, ButtonInteraction, Client, EmbedBuilder, Interaction, ModalSubmitInteraction, TextBasedChannel, TextChannel, ThreadAutoArchiveDuration, User } from "discord.js";
import { AddButton } from "../buttons/_buttons";
import {  CreateGameEmbedConstants, CreateGameThreadConstants } from "../constants/createGame";
import { GameApplicationEmbedConstants, AcceptApplicationButtonConstants, RejectApplicationButtonConstants } from "../constants/gameApplication";
import { GlobalConstants } from "../constants/global";

export async function gameApplicationEmbed(user: User,
    thread: TextBasedChannel,
    gameName: string,
    answers: APIEmbedField[],
    detailsId: string) {
    const embed = new EmbedBuilder()
        .setTitle(GameApplicationEmbedConstants.TITLE + gameName)
        .setThumbnail(user.avatarURL())
        .setColor(GameApplicationEmbedConstants.EMBED_COLOR)
        .setDescription(GameApplicationEmbedConstants.DESC + user.toString())
        .addFields(answers)
        .setTimestamp()
        .setFooter({ text: CreateGameEmbedConstants.FOOTER})

    const acceptButton = AddButton(AcceptApplicationButtonConstants.ID, undefined, undefined, detailsId)
    const rejectButton = AddButton(RejectApplicationButtonConstants.ID, undefined, undefined, detailsId)

    await thread.send({ embeds: [embed], components: [acceptButton!, rejectButton!] })
}