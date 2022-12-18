import { ActionRowBuilder, ButtonBuilder, ButtonStyle, CacheType, ChatInputCommandInteraction, Client, CommandInteraction, Interaction, SlashCommandBuilder } from "discord.js";
import { AcceptApplicationButtonConstants, ApplyGameButtonConstants, ApplyToGameModalConstants } from "../constants/createGame";
import { GlobalConstants } from "../constants/global";
import { getGameDetails } from "../functions/applyToGame";
import { AddModal } from "../modals/_modals";
import { Button } from "./_button";

function getButton(client?: Client, interaction?: Interaction, id?: string) {
    const applyButton = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
        new ButtonBuilder()
            .setCustomId(AcceptApplicationButtonConstants.ID + GlobalConstants.ID_SEPARATOR + id)
            .setLabel(AcceptApplicationButtonConstants.TITLE)
            .setStyle(ButtonStyle.Success)
    );
    return applyButton
}

async function execute(client: Client, interaction: Interaction) {
    if (interaction.isButton()){
        const ids = interaction.customId.split(GlobalConstants.ID_SEPARATOR)

        const userId = ids[1]
        const messageId = ids[2]
        const message = await interaction.channel?.messages.fetch(messageId)

        var values = message?.content.split('\n')
        var gameName = values?.shift() || ''
        var dm= values?.shift() || ''
        var roleName= values?.shift() || ''

        var role = interaction.guild?.roles.cache.find(role => role.name === roleName)

        
        var user = await client.users.fetch(userId);
        var member = await interaction.guild?.members.fetch(user)
        await member?.roles.add(role!)

        await interaction.reply("Application Accepted");
    }
}

export const AcceptApplication: Button = {
    id: AcceptApplicationButtonConstants.ID,
    getButton: getButton,
    execute: execute
}