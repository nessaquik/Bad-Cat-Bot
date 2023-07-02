import { ButtonBuilder, ButtonInteraction, ButtonStyle, Client, Interaction, PermissionsBitField } from "discord.js";
import { EditGameModalConstants } from "../../constants/createGame";
import { EditGameButtonConstants } from "../../constants/gameApplication";
import { GlobalConstants } from "../../constants/global";
import { AddModal } from "../../modals/_modals";
import { Button } from "../_button";

function getButton(client?: Client, interaction?: Interaction, id?: string) {
    return new ButtonBuilder()
            .setCustomId(EditGameButtonConstants.ID + GlobalConstants.ID_SEPARATOR + id)
            .setLabel(EditGameButtonConstants.TITLE)
            .setStyle(ButtonStyle.Secondary)
}

async function execute(client: Client, interaction: Interaction) {
    if (interaction.isButton()){
        log(interaction)
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

function log(interaction: ButtonInteraction){
    console.log("Application edited by " + interaction.user.username)
}

export const EditGame: Button = {
    id: EditGameButtonConstants.ID,
    getButton: getButton,
    execute: execute
}