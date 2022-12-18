import { ActionRowBuilder, ButtonBuilder, ButtonStyle, CacheType, ChatInputCommandInteraction, Client, CommandInteraction, Interaction, SlashCommandBuilder } from "discord.js";
import { ApplyGameButtonConstants, ApplyToGameModalConstants } from "../constants/createGame";
import { GlobalConstants } from "../constants/global";
import { AddModal } from "../modals/_modals";
import { Button } from "./_button";

function getButton(client?: Client, interaction?: Interaction, id?: string) {
    const applyButton = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
        new ButtonBuilder()
            .setCustomId(ApplyGameButtonConstants.ID + GlobalConstants.ID_SEPARATOR + id)
            .setLabel(ApplyGameButtonConstants.TITLE)
            .setStyle(ButtonStyle.Primary)
    );
    return applyButton
}

async function execute(client: Client, interaction: Interaction) {
    if (interaction.isButton()){
        await AddModal(client, interaction, ApplyToGameModalConstants.ID, interaction.user.id)
    }
}

export const ApplyGame: Button = {
    id: ApplyGameButtonConstants.ID,
    getButton: getButton,
    execute: execute
}