import { ButtonBuilder, ButtonInteraction, ButtonStyle, Client, Interaction } from "discord.js";
import { RejectApplicationButtonConstants } from "../../constants/gameApplication";
import { GlobalConstants } from "../../constants/global";
import { GameDetails, getGameDetailsFromThread } from "../../functions/gameDetails";
import { Button } from "../_button";
import { ApplicationAction, isDMorUser_LEGACY } from "../../functions/_Base/commonMethods";
import { applicationAction } from "../../functions/GameApplications/appAction";

function getButton(client?: Client, interaction?: Interaction, id?: string) {
    return new ButtonBuilder()
            .setCustomId(RejectApplicationButtonConstants.ID + GlobalConstants.ID_SEPARATOR + id)
            .setLabel(RejectApplicationButtonConstants.TITLE)
            .setStyle(ButtonStyle.Danger)
}

async function execute(client: Client, interaction: Interaction) {
    if (interaction.isButton()){
        await applicationAction(client, interaction, ApplicationAction.Reject)
    }
}

function log(interaction: ButtonInteraction){
    console.log("Application rejected by " + interaction.user.username + " with id " + interaction.customId)
}

export const RejectApplication: Button = {
    id: RejectApplicationButtonConstants.ID,
    getButton: getButton,
    execute: execute
}