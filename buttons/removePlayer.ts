import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, CacheType, ChatInputCommandInteraction, Client, CommandInteraction, Embed, Interaction, SlashCommandBuilder, User } from "discord.js";
import { GameApplicationEmbedConstants, AcceptApplicationButtonConstants, RemovePlayerButtonConstants, ApplyGameButtonConstants } from "../constants/gameApplication";
import { GlobalConstants } from "../constants/global";
import { GameDetails, getGameDetails, getGameDetailsFromThread } from "../functions/gameDetails";
import { AddModal } from "../modals/_modals";
import { Button } from "./_button";
import { removeRoleUser } from "../functions/applyToGame";

function getButton(client?: Client, interaction?: Interaction, id?: string) {
    return new ButtonBuilder()
            .setCustomId(RemovePlayerButtonConstants.ID + GlobalConstants.ID_SEPARATOR + id)
            .setLabel(RemovePlayerButtonConstants.TITLE)
            .setStyle(ButtonStyle.Danger)
}

async function execute(client: Client, interaction: Interaction) {
    if (interaction.isButton()){
        try {
            log(interaction)
            const ids = interaction.customId.split(GlobalConstants.ID_SEPARATOR)
            const userId = ids[1]
            const messageId = ids[2]
            
            var game: GameDetails = await getGameDetailsFromThread(interaction.channel!, messageId)
            var embed = interaction.message.embeds[0]
            var user = await client.users.fetch(userId);
            
            if (interaction.user.id != game.dm){
                await interaction.reply({
                    content: RemovePlayerButtonConstants.PERMISSION,
                    ephemeral: true
                });
            }
            else{
                var user = await client.users.fetch(userId);
                await removeRoleUser(user, game.role, client, interaction); 

                embed.fields.push({
                    name: "\u200B",
                    value: "\u200B"
                });
                embed.fields.push({
                    name: RemovePlayerButtonConstants.STATUS_ID,
                    value: RemovePlayerButtonConstants.STATUS_MESSAGE
                });            
                await interaction.message.edit({embeds:[embed], components: []});

                user.send(RemovePlayerButtonConstants.MESSAGE_PERSONAL + game.gameName)
                await interaction.reply(RemovePlayerButtonConstants.MESSAGE_DM + user.username );              
            }
        }
        catch (e) {
            console.error(e)
            await interaction.reply({
                content: GlobalConstants.ERROR,
                ephemeral: true
            })
        }
    }
}

function log(interaction: ButtonInteraction){
    console.log("Player removed by " + interaction.user.username + " with id " + interaction.customId)
}

export const RemovePlayer: Button = {
    id: RemovePlayerButtonConstants.ID,
    getButton: getButton,
    execute: execute
}