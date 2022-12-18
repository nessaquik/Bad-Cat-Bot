import { ButtonInteraction, Client, EmbedBuilder, Interaction, ModalSubmitInteraction, TextChannel, ThreadAutoArchiveDuration } from "discord.js";
import { AddButton } from "../buttons/_buttons";
import { ApplyGameButtonConstants, CreateGameEmbedConstants, CreateGameThreadConstants, GameApplicationEmbedConstants } from "../constants/createGame";
import { GlobalConstants } from "../constants/global";


export async function getGameDetails(
    client: Client, 
    interaction: ButtonInteraction) {
    const ids = interaction.customId.split(GlobalConstants.ID_SEPARATOR)

    const threadId = ids[1]
    const messageId = ids[2]
    const thread = await client.channels.fetch(threadId) as TextChannel
    const message = await thread.messages.fetch(messageId)

    return {thread, message}
}

export async function getGameMessage(
    client: Client, 
    interaction: ButtonInteraction) {
    let {thread, message} = await getGameDetails(client, interaction)
    return message.content.split('\n')
}

export async function gameApplicationEmbed(client: Client, 
    interaction: ButtonInteraction,
    submitted: ModalSubmitInteraction) {

    //TODO: REDUNDANT CALLS - REDUCE IMMEDIATELY!!!
    let {thread, message} = await getGameDetails(client, interaction)
    var values = message.content.split('\n')
    const gameName = values.shift()
    const dm = values.shift()
    const role = values.shift()

    const embed = new EmbedBuilder()
        .setTitle(GameApplicationEmbedConstants.TITLE + gameName)
        .setColor(GameApplicationEmbedConstants.EMBED_COLOR)
        .setDescription(GameApplicationEmbedConstants.DESC + interaction.user.toString())
        // .addFields(
        //     { name: CreateGameEmbedConstants.DM, value: dm },
        //     { name: CreateGameEmbedConstants.GAME_DETAILS, value: template },
        //     { name: CreateGameEmbedConstants.APPLICATION, value: questions },
        // )
        .setTimestamp()
        .setFooter({ text: CreateGameEmbedConstants.FOOTER})

    await thread.send({ embeds: [embed]})
}