import { ActionRowBuilder, ButtonBuilder, ButtonStyle, CacheType, ChatInputCommandInteraction, Client, CommandInteraction, Embed, Interaction, SlashCommandBuilder, User } from "discord.js";
import { GameApplicationEmbedConstants, AcceptApplicationButtonConstants, RejectApplicationButtonConstants, ApplyGameButtonConstants } from "../constants/gameApplication";
import { GlobalConstants } from "../constants/global";
import { GameDetails, getGameDetails, getGameDetailsFromThread } from "../functions/gameDetails";
import { AddModal } from "../modals/_modals";
import { Button } from "./_button";

function getButton(client?: Client, interaction?: Interaction, id?: string) {
    return new ButtonBuilder()
            .setCustomId(RejectApplicationButtonConstants.ID + GlobalConstants.ID_SEPARATOR + id)
            .setLabel(RejectApplicationButtonConstants.TITLE)
            .setStyle(ButtonStyle.Danger)
}

async function execute(client: Client, interaction: Interaction) {
    if (interaction.isButton()){
        const ids = interaction.customId.split(GlobalConstants.ID_SEPARATOR)
        const userId = ids[1]
        const messageId = ids[2]
        
        var game: GameDetails = await getGameDetailsFromThread(interaction.channel!, messageId)
        
        if (interaction.user.id != game.dm){
            await interaction.reply({
                content: RejectApplicationButtonConstants.PERMISSION,
                ephemeral: true
            });
        }
        else{            
            var user = await client.users.fetch(userId);
            
            var embed = interaction.message.embeds[0]
            embed.fields.push({
                name: "\u200B",
                value: "\u200B"
            });
            embed.fields.push({
                name: RejectApplicationButtonConstants.STATUS_ID,
                value: RejectApplicationButtonConstants.STATUS_MESSAGE
            });            
            await interaction.message.edit({embeds:[embed], components: []});
            
            user.send(RejectApplicationButtonConstants.MESSAGE_PERSONAL + game.gameName)
            await interaction.reply(RejectApplicationButtonConstants.MESSAGE_DM + user.username );
        }
    }
}

export const RejectApplication: Button = {
    id: RejectApplicationButtonConstants.ID,
    getButton: getButton,
    execute: execute
}