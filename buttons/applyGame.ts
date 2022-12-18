import { ActionRowBuilder, ButtonBuilder, ButtonStyle, CacheType, ChatInputCommandInteraction, Client, CommandInteraction, Interaction, SlashCommandBuilder } from "discord.js";
import { ApplyGameButtonConstants } from "../constants/createGame";
import { GlobalConstants } from "../constants/global";
import { PingConstants } from "../constants/ping";
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
        await interaction.reply(interaction.customId);
    }
}

export const ApplyGame: Button = {
    id: ApplyGameButtonConstants.ID,
    getButton: getButton,
    execute: execute
}