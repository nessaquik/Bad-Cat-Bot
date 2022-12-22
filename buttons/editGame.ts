import { ActionRowBuilder, ButtonBuilder, ButtonStyle, CacheType, ChatInputCommandInteraction, Client, CommandInteraction, Interaction, PermissionsBitField, SlashCommandBuilder } from "discord.js";
import { EditGameModalConstants } from "../constants/createGame";
import { ApplyGameButtonConstants, ApplyToGameModalConstants, EditGameButtonConstants } from "../constants/gameApplication";
import { GlobalConstants } from "../constants/global";
import { AddModal } from "../modals/_modals";
import { Button } from "./_button";

function getButton(client?: Client, interaction?: Interaction, id?: string) {
    return new ButtonBuilder()
            .setCustomId(EditGameButtonConstants.ID + GlobalConstants.ID_SEPARATOR + id)
            .setLabel(EditGameButtonConstants.TITLE)
            .setStyle(ButtonStyle.Secondary)
}

async function execute(client: Client, interaction: Interaction) {
    if (interaction.isButton()){
        var permissions = interaction.member?.permissions as PermissionsBitField
        if (permissions.has(GlobalConstants.Permissions)){
            await AddModal(client, interaction, EditGameModalConstants.ID, interaction.user.id)
        }
        else{
            await interaction.reply({
                content: EditGameModalConstants.PERMISSIONS,
                ephemeral: true
            });
        }        
    }
}

export const EditGame: Button = {
    id: EditGameButtonConstants.ID,
    getButton: getButton,
    execute: execute
}