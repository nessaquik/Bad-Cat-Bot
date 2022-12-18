import { ChatInputCommandInteraction, ModalSubmitInteraction, TextChannel, ChannelType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import { AddButton } from "../buttons/_buttons";
import { ApplyGameButtonConstants, CreateGameEmbedConstants, CreateGameThreadConstants } from "../constants/createGame";
import { GlobalConstants } from "../constants/global";

export async function createDiscussionThread(channel: TextChannel,
    gameName: string,
    dm: string) {
    const thread = await channel?.threads.create({
        name: CreateGameThreadConstants.DISCUSSION_THREAD_NAME + gameName,
    })
    await thread.members.add(dm);
}

export async function createApplicationThread(channel: TextChannel,
    gameName: string,
    dm: string,
    role: string,
    questions: string) {
    const thread = await channel?.threads.create({
        name: CreateGameThreadConstants.APPLICATION_THREAD_NAME + gameName,
        type: ChannelType.PrivateThread,
    })
    await thread.members.add(dm);

    //This is read in getGameValues. Don't modify without changing that function
    //This is just a cheap ass way of saving DB money
    var message = await thread.send([gameName, dm, role, questions].join('\n'))
    return [thread.id, message.id].join(GlobalConstants.ID_SEPARATOR)
}

export async function sendGameEmbed(channel: TextChannel,
    gameName: string,
    desc: string,
    template: string,
    questions: string,
    dm: string,
    detailsId: string
) {
    const embed = new EmbedBuilder()
        .setTitle(gameName)
        .setColor(CreateGameEmbedConstants.EMBED_COLOR)
        .setDescription(desc)
        .setThumbnail(GlobalConstants.THUMBNAIL)
        .addFields(
            { name: CreateGameEmbedConstants.DM, value: dm },
            { name: CreateGameEmbedConstants.GAME_DETAILS, value: template },
            { name: CreateGameEmbedConstants.APPLICATION, value: questions },
        )
        .setTimestamp()
        .setFooter({ text: CreateGameEmbedConstants.FOOTER})

    const button = AddButton(ApplyGameButtonConstants.ID, undefined, undefined, detailsId)

    await channel.send({ embeds: [embed], components: [button!] })
}