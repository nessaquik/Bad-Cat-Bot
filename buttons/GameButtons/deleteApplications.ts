import { ButtonBuilder, ButtonInteraction, ButtonStyle, Client, Interaction } from "discord.js";
import { DeleteGameButtonConstants } from "../../constants/gameApplication";
import dotenv from 'dotenv';
import { Button } from "../_button";
dotenv.config()

function getButton(client?: Client, interaction?: Interaction, id?: string) {
    return new ButtonBuilder()
            .setCustomId(DeleteGameButtonConstants.ID)
            .setLabel(DeleteGameButtonConstants.TITLE)
            .setStyle(ButtonStyle.Danger)
}

async function execute(client: Client, interaction: Interaction) {
    if (interaction.isButton()){
        log(interaction)
        await interaction.reply({
            content: DeleteGameButtonConstants.MESSAGE,
            ephemeral: true
        });   
        await interaction.channel?.delete()
    }
}

function log(interaction: ButtonInteraction){
    console.log("Application deleted by " + interaction.user.username)
}

export const DeleteGame: Button = {
    id: DeleteGameButtonConstants.ID,
    getButton: getButton,
    execute: execute
}