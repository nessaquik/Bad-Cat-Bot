import { ActionRowBuilder, APIEmbedField, ButtonBuilder, ButtonInteraction, Client, EmbedBuilder, Interaction, ModalSubmitInteraction, PartialTextBasedChannelFields, TextBasedChannel, TextChannel, ThreadAutoArchiveDuration, User } from "discord.js";
import { AddButton } from "../buttons/_buttons";
import {  CreateGameEmbedConstants, CreateGameThreadConstants } from "../constants/createGame";
import { GameApplicationEmbedConstants, AcceptApplicationButtonConstants, RejectApplicationButtonConstants } from "../constants/gameApplication";
import { GlobalConstants } from "../constants/global";

export async function gameApplicationEmbed(user: User,
    thread: PartialTextBasedChannelFields,
    gameName: string,
    answers: APIEmbedField[],
    detailsId: string) {
    const embed = new EmbedBuilder()
        .setTitle(GameApplicationEmbedConstants.TITLE + gameName)
        .setColor(GameApplicationEmbedConstants.EMBED_COLOR)
        .setDescription(GameApplicationEmbedConstants.DESC + user.toString())
        .setAuthor({ name: user.username, iconURL: user.avatarURL()! })
        .addFields(answers)
        .setTimestamp()
        .setFooter({ text: CreateGameEmbedConstants.FOOTER})

        const acceptButton = AddButton(AcceptApplicationButtonConstants.ID, undefined, undefined, detailsId)
        const rejectButton = AddButton(RejectApplicationButtonConstants.ID, undefined, undefined, detailsId)
        const row = new ActionRowBuilder<ButtonBuilder>().addComponents([acceptButton!, rejectButton!]);

        await thread.send({ embeds: [embed], components: [row!] })
        await user.send({ embeds: [embed] })
}

export async function addRole(
    userId: string,
    roleName: string,
    client: Client, 
    interaction: Interaction){
    var user = await client.users.fetch(userId);
    await addRoleUser(user, roleName, client, interaction)
}

export async function addRoleUser(
    user: User,
    roleName: string,
    client: Client, 
    interaction: Interaction){
    var role = interaction.guild?.roles.cache.find(role => role.name === roleName)
    var member = await interaction.guild?.members.fetch(user)
    await member?.roles.add(role!) 
}