import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, CacheType, ChatInputCommandInteraction, Client, CommandInteraction, Interaction, PermissionsBitField, SlashCommandBuilder } from "discord.js";
import { ApplyGameButtonConstants, ApplyToGameModalConstants, PauseGameButtonConstants } from "../constants/gameApplication";
import { GlobalConstants } from "../constants/global";
import { pauseGame } from "../functions/createGame";
import { GameDetails, getGameDetails } from "../functions/gameDetails";
import { AddModal } from "../modals/_modals";
import { Button } from "./_button";

function getButton(client?: Client, interaction?: Interaction, id?: string) {
    return new ButtonBuilder()
            .setCustomId(PauseGameButtonConstants.ID + GlobalConstants.ID_SEPARATOR + id)
            .setLabel(PauseGameButtonConstants.TITLE)
            .setStyle(ButtonStyle.Danger)
}

async function execute(client: Client, interaction: Interaction) {
    if (interaction.isButton()){
        log(interaction)
        const ids = interaction.customId.split(GlobalConstants.ID_SEPARATOR)
        const threadId = ids[1]
        const messageId = ids[2]
        var game: GameDetails = await getGameDetails(client, threadId, messageId)
        
        if (interaction.user.id == game.dm){
            await pauseGame(interaction.message, threadId+GlobalConstants.ID_SEPARATOR+messageId)
            await interaction.reply({
                content: PauseGameButtonConstants.MESSAGE,
                ephemeral: true
            });
        }
        else{
            await interaction.reply({
                content: PauseGameButtonConstants.PERMISSIONS,
                ephemeral: true
            });
        }        
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