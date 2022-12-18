import { APIEmbedField, ButtonInteraction, Client, EmbedBuilder, Interaction, ModalSubmitInteraction, TextChannel, ThreadAutoArchiveDuration, User } from "discord.js";
import { AddButton } from "../buttons/_buttons";
import { AcceptApplicationButtonConstants, ApplyGameButtonConstants, CreateGameEmbedConstants, CreateGameThreadConstants, GameApplicationEmbedConstants } from "../constants/createGame";
import { GlobalConstants } from "../constants/global";

export async function getGameDetails(
    client: Client, 
    id: string) {
    const ids = id.split(GlobalConstants.ID_SEPARATOR)

    const threadId = ids[1]
    const messageId = ids[2]
    const thread = await client.channels.fetch(threadId) as TextChannel
    const message = await thread.messages.fetch(messageId)

    return {thread, message}
}

export async function gameApplicationEmbed(user: User,
    thread: TextChannel,
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

    const button = AddButton(AcceptApplicationButtonConstants.ID, undefined, undefined, detailsId)

    await thread.send({ embeds: [embed], components: [button!] })
}