import { ActionRowBuilder, APIEmbedField, ButtonBuilder, ButtonInteraction, Client, EmbedBuilder, Interaction, ModalSubmitInteraction, PartialTextBasedChannelFields, TextBasedChannel, TextChannel, ThreadAutoArchiveDuration, User, Integration } from 'discord.js';
import { AddButton } from "../../buttons/_buttons";
import {  CreateGameEmbedConstants, CreateGameThreadConstants } from "../../constants/createGame";
import { GameApplicationEmbedConstants, AcceptApplicationButtonConstants, RejectApplicationButtonConstants, RemovePlayerButtonConstants } from "../../constants/gameApplication";
import { GlobalConstants } from "../../constants/global";
import { GameDetails, getGameDetailsFromThread, incrementAcceptedCount } from "../gameDetails";
import { AddAppAcceptedToNotion } from '../../notion/applicationAccepted';
import { isDM_LEGACY, addRoleToUser, isDMorUser_LEGACY, removeRoleFromUser , ApplicationAction, isDMorUser, isDM} from '../_Base/commonMethods';
import { getApplicationAuthorId, postActionApplicationEmbed } from './appEmbed';
import { GameEmbedDetails, getEmbedDetails } from '../CreateGame/gameEmbed';

export async function applicationAction(client: Client, 
    interaction: ButtonInteraction,
    action: ApplicationAction) {
        var userId = getApplicationAuthorId(interaction.message);
        if (!userId){
            console.log("Following legacy path for app action")
            //This is the legacy path
            await applicationAction_LEGACY(client, interaction, action)
        }
        else {
            console.log("Following new path for app action")
            //This is the new path
            await applicationAction_NEW(client, interaction, action)
        }
}

export async function applicationAction_NEW(client: Client, 
    interaction: ButtonInteraction,
    action: ApplicationAction) {
        const ids = interaction.customId.split(GlobalConstants.ID_SEPARATOR)
        const channelId = ids[1]
        const messageId = ids[2]

        //TODO: This is a rather expensive operation, see if it can be reduced to one call
        const channel = await client.channels.fetch(channelId) as TextBasedChannel
        const message = await channel.messages.fetch(messageId)
        
        var game: GameEmbedDetails = await getEmbedDetails(message)
        var userId = getApplicationAuthorId(interaction.message);
        var user = await client.users.fetch(userId!);
        var isOperationAllowed = action == ApplicationAction.Reject ? await isDMorUser(game,user,interaction) : await isDM(game,interaction) 

        if (isOperationAllowed){
            await assignRoles(user, game.role, client, interaction, action)
            await postActionApplicationEmbed(action, interaction.message)                                    
            //TODO: Increment count
            await sendAcknowledgement(user, game.name, interaction, action)            
            LogToNotion(user, interaction, action)
        }
}

//!-------------------------------Private Methods-------------------------------!

async function assignRoles(user: User, 
    role: string, 
    client: Client, 
    interaction: ButtonInteraction,
    action: ApplicationAction){
        if (action == ApplicationAction.Accept){
            await addRoleToUser(user, role, client, interaction)
        }
        else if (action == ApplicationAction.Remove){
            await removeRoleFromUser(user, role, client, interaction)
        }
}

async function sendAcknowledgement(user: User, 
    gameName: string,
    interaction: ButtonInteraction,
    action: ApplicationAction){
        //No awaiting on the message send to user because it's an acknowledgement, and not important to the flow.
        if (action == ApplicationAction.Accept){            
            await interaction.reply(AcceptApplicationButtonConstants.MESSAGE_DM + user.username );
            user.send(AcceptApplicationButtonConstants.MESSAGE_PERSONAL + gameName);
        }
        else if (action == ApplicationAction.Remove){            
            await interaction.reply(RemovePlayerButtonConstants.MESSAGE_DM + user.username );
            user.send(RemovePlayerButtonConstants.MESSAGE_PERSONAL + gameName);
        }
        else if (action == ApplicationAction.Reject){            
            await interaction.reply(RejectApplicationButtonConstants.MESSAGE_DM + user.username );
            user.send(RejectApplicationButtonConstants.MESSAGE_PERSONAL + gameName);
        }
}

async function LogToNotion(user: User, 
    interaction: ButtonInteraction,
    action: ApplicationAction){
        if (action == ApplicationAction.Accept){
            AddAppAcceptedToNotion(user.username, interaction.channelId)
        }    
}


//!-------------------------------legacy methods-------------------------------!

export async function applicationAction_LEGACY(client: Client, 
    interaction: ButtonInteraction,
    action: ApplicationAction) {
        const ids = interaction.customId.split(GlobalConstants.ID_SEPARATOR)
        const userId = ids[1]
        const messageId = ids[2]
        
        var game: GameDetails = await getGameDetailsFromThread(interaction.channel!, messageId)
        var user = await client.users.fetch(userId);
        var isOperationAllowed = action == ApplicationAction.Reject ? await isDMorUser_LEGACY(game,user,interaction) : await isDM_LEGACY(game,interaction) 

        if (isOperationAllowed){
            await assignRoles(user, game.role, client, interaction, action)
            await postActionApplicationEmbed(action, interaction.message)                                    
            await incrementAcceptedCount(interaction.channel!, messageId)
            await sendAcknowledgement(user, game.gameName, interaction, action)            
            LogToNotion(user, interaction, action)
        }
}