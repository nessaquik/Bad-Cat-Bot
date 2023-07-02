import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, CacheType, ChatInputCommandInteraction, Client, CommandInteraction, Interaction, SlashCommandBuilder, User } from "discord.js";
import { GameApplicationEmbedConstants, AcceptApplicationButtonConstants, RejectApplicationButtonConstants, ApplyGameButtonConstants, RemovePlayerButtonConstants } from "../../constants/gameApplication";
import { GlobalConstants } from "../../constants/global";
import { GameDetails, getGameDetailsFromThread, incrementAcceptedCount } from "../../functions/gameDetails";
import { AddModal } from "../../modals/_modals";
import { AddAppAcceptedToNotion } from "../../notion/applicationAccepted";
import { Button } from "../_button";
import { AddButton } from "../_buttons";
import { ApplicationAction, addRoleToUser, isDM_LEGACY } from "../../functions/_Base/commonMethods";
import { applicationAction } from "../../functions/GameApplications/appAction";

function getButton(client?: Client, interaction?: Interaction, id?: string) {    
    return new ButtonBuilder()
        .setCustomId(AcceptApplicationButtonConstants.ID + GlobalConstants.ID_SEPARATOR + id)
        .setLabel(AcceptApplicationButtonConstants.TITLE)
        .setStyle(ButtonStyle.Success)
}

async function execute(client: Client, interaction: Interaction) {
    if (interaction.isButton()){
        await applicationAction(client, interaction, ApplicationAction.Accept)
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
