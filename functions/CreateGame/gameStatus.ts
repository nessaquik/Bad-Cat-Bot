import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, Client, TextChannel } from "discord.js";
import { AddButton } from "../../buttons/_buttons";
import { PauseGameButtonConstants, PlayGameButtonConstants, DeleteGameButtonConstants } from "../../constants/gameApplication";
import dotenv from 'dotenv';
import { getChannelIdFromMention, isDM } from "../_Base/commonMethods";
import { editEmbedState, getEmbedDetails } from "./gameEmbed";
import { getGameFormat } from "./gameBase";
import { CreateGameEmbedConstants } from "../../constants/createGame";
dotenv.config()

export async function editGameState(
    client: Client, 
    interaction: ButtonInteraction,
    pause: boolean){
    var game = getEmbedDetails(interaction.message)     
    var isOperationAllowed = await isDM(game,interaction)
    if (isOperationAllowed){
        await editEmbedState(interaction, pause)

        if (pause) {
            var gameFormat = getGameFormat(game.template)
            if (gameFormat.toLowerCase().indexOf("oneshot") != -1 || !game.channel || game.channel == CreateGameEmbedConstants.UNAVAILABLE){
                //We can only move the application if it has a channel and isn't a oneshot.
                var deleteButton = AddButton(DeleteGameButtonConstants.ID, undefined, undefined, undefined)  
                const row = new ActionRowBuilder<ButtonBuilder>().addComponents([deleteButton!]);

                await interaction.reply({
                    content: PauseGameButtonConstants.DELETE_MESSAGE,
                    ephemeral: true,
                    components: [row]
                });
            }
            else {
                var gameLocationChannelId = getChannelIdFromMention(game.channel)
                const gameLocationChannel = await client.channels.fetch(gameLocationChannelId!) as TextChannel
                var applicationChannel = interaction.channel as TextChannel
                applicationChannel.setParent(gameLocationChannel.parentId)

                await interaction.reply({
                    content: PauseGameButtonConstants.MOVE_MESSAGE,
                    ephemeral: true
                });
            }            
        }
        else {
            await interaction.reply({
                content: PlayGameButtonConstants.MESSAGE,
                ephemeral: true
            });
        }
    }
}


//!-------------------------------Private Methods-------------------------------!
