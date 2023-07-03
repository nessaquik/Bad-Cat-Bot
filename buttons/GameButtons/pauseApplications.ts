import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, Client, Interaction } from "discord.js";
import { DeleteGameButtonConstants, PauseGameButtonConstants } from "../../constants/gameApplication";
import dotenv from 'dotenv';
import { Button } from "../_button";
import { editGameState } from "../../functions/CreateGame/gameStatus";
import { AddButton } from "../_buttons";
dotenv.config()

function getButton(client?: Client, interaction?: Interaction, id?: string) {
    return new ButtonBuilder()
            .setCustomId(PauseGameButtonConstants.ID)
            .setLabel(PauseGameButtonConstants.TITLE)
            .setStyle(ButtonStyle.Danger)
}

async function execute(client: Client, interaction: Interaction) {
    if (interaction.isButton()){
        log(interaction)
        await editGameState(client, interaction, true)
    }
}

function log(interaction: ButtonInteraction){
    console.log("Application paused by " + interaction.user.username)
}

export const PauseGame: Button = {
    id: PauseGameButtonConstants.ID,
    getButton: getButton,
    execute: execute
}