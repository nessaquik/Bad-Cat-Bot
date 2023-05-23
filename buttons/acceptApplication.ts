import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, CacheType, ChatInputCommandInteraction, Client, CommandInteraction, Interaction, SlashCommandBuilder, User } from "discord.js";
import { GameApplicationEmbedConstants, AcceptApplicationButtonConstants, RejectApplicationButtonConstants, ApplyGameButtonConstants, RemovePlayerButtonConstants } from "../constants/gameApplication";
import { GlobalConstants } from "../constants/global";
import { addRoleUser } from "../functions/applyToGame";
import { GameDetails, getGameDetailsFromThread, incrementAcceptedCount } from "../functions/gameDetails";
import { AddModal } from "../modals/_modals";
import { AddAppAcceptedToNotion } from "../notion/applicationAccepted";
import { Button } from "./_button";
import { AddButton } from "./_buttons";

function getButton(client?: Client, interaction?: Interaction, id?: string) {    
    return new ButtonBuilder()
        .setCustomId(AcceptApplicationButtonConstants.ID + GlobalConstants.ID_SEPARATOR + id)
        .setLabel(AcceptApplicationButtonConstants.TITLE)
        .setStyle(ButtonStyle.Success)
}

async function execute(client: Client, interaction: Interaction) {
    if (interaction.isButton()){
        try {
            log(interaction)
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
                
                const acceptButton = AddButton(RemovePlayerButtonConstants.ID, undefined, undefined, userId + GlobalConstants.ID_SEPARATOR + messageId)
                const row = new ActionRowBuilder<ButtonBuilder>().addComponents([acceptButton!]);

                await interaction.message.edit({embeds:[embed], components: [row!]});                
                await incrementAcceptedCount(interaction.channel!, messageId)
                user.send(AcceptApplicationButtonConstants.MESSAGE_PERSONAL + game.gameName);

                await interaction.reply(AcceptApplicationButtonConstants.MESSAGE_DM + user.username );
                AddAppAcceptedToNotion(user.username, game.messageId)
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
    console.log("Application accepted by " + interaction.user.username + " with id " + interaction.customId)
}

export const AcceptApplication: Button = {
    id: AcceptApplicationButtonConstants.ID,
    getButton: getButton,
    execute: execute
}
