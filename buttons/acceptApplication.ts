import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, CacheType, ChatInputCommandInteraction, Client, CommandInteraction, Interaction, SlashCommandBuilder, User } from "discord.js";
import { GameApplicationEmbedConstants, AcceptApplicationButtonConstants, RejectApplicationButtonConstants, ApplyGameButtonConstants } from "../constants/gameApplication";
import { GlobalConstants } from "../constants/global";
import { addRoleUser } from "../functions/applyToGame";
import { GameDetails, getGameDetailsFromThread, incrementAcceptedCount } from "../functions/gameDetails";
import { AddModal } from "../modals/_modals";
import { Button } from "./_button";

function getButton(client?: Client, interaction?: Interaction, id?: string) {    
    return new ButtonBuilder()
        .setCustomId(AcceptApplicationButtonConstants.ID + GlobalConstants.ID_SEPARATOR + id)
        .setLabel(AcceptApplicationButtonConstants.TITLE)
        .setStyle(ButtonStyle.Success)
}

async function execute(client: Client, interaction: Interaction) {
    if (interaction.isButton()){
        const ids = interaction.customId.split(GlobalConstants.ID_SEPARATOR)
        const userId = ids[1]
        const messageId = ids[2]
        
        var game: GameDetails = await getGameDetailsFromThread(interaction.channel!, messageId)

        if (interaction.user.id != game.dm){
            await interaction.reply({
                content: AcceptApplicationButtonConstants.PERMISSION,
                ephemeral: true
            });
        }
        else{
            var user = await client.users.fetch(userId);
            await addRoleUser(user, game.role, client, interaction);        
            
            var embed = interaction.message.embeds[0]
            embed.fields.push({
                name: "\u200B",
                value: "\u200B"
            });
            embed.fields.push({
                name: AcceptApplicationButtonConstants.STATUS_ID,
                value: AcceptApplicationButtonConstants.STATUS_MESSAGE
            });            
            await interaction.message.edit({embeds:[embed], components: []});

            user.send(AcceptApplicationButtonConstants.MESSAGE_PERSONAL + game.gameName)
            await incrementAcceptedCount(interaction.channel!, messageId)
            await interaction.reply(AcceptApplicationButtonConstants.MESSAGE_DM + user.username );
        }
    }
}

export const AcceptApplication: Button = {
    id: AcceptApplicationButtonConstants.ID,
    getButton: getButton,
    execute: execute
}
