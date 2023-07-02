import { ButtonBuilder, ButtonInteraction, ButtonStyle, Client, Interaction } from "discord.js";
import { PauseGameButtonConstants } from "../../constants/gameApplication";
import { GlobalConstants } from "../../constants/global";
import dotenv from 'dotenv';
import { Button } from "../_button";
import { editApplicationState } from "../../functions/CreateGame/gameEmbed";
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
        await editApplicationState(client, interaction, true)     
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