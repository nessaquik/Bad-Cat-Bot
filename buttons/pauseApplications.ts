import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, CacheType, ChatInputCommandInteraction, Client, CommandInteraction, Interaction, PermissionsBitField, SlashCommandBuilder } from "discord.js";
import { ApplyGameButtonConstants, ApplyToGameModalConstants, PauseGameButtonConstants } from "../constants/gameApplication";
import { GlobalConstants } from "../constants/global";
import dotenv from 'dotenv'
import { editApplicationState, pauseGame } from "../functions/createGame";
import { GameDetails, getGameDetails } from "../functions/gameDetails";
import { AddModal } from "../modals/_modals";
import { Button } from "./_button";
dotenv.config()

function getButton(client?: Client, interaction?: Interaction, id?: string) {
    return new ButtonBuilder()
            .setCustomId(PauseGameButtonConstants.ID + GlobalConstants.ID_SEPARATOR + id)
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