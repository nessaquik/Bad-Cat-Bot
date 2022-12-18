import { ActionRowBuilder, ButtonBuilder, ButtonStyle, CacheType, ChatInputCommandInteraction, Client, CommandInteraction, Interaction, SlashCommandBuilder } from "discord.js";
import { ApplyGameButtonConstants, ApplyToGameModalConstants } from "../constants/gameApplication";
import { GlobalConstants } from "../constants/global";
import { AddModal } from "../modals/_modals";
import { Button } from "./_button";

function getButton(client?: Client, interaction?: Interaction, id?: string) {
    return new ButtonBuilder()
            .setCustomId(ApplyGameButtonConstants.ID + GlobalConstants.ID_SEPARATOR + id)
            .setLabel(ApplyGameButtonConstants.TITLE)
            .setStyle(ButtonStyle.Primary)
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