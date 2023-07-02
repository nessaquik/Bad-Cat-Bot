import { ButtonBuilder, ButtonInteraction, ButtonStyle, Client, Interaction } from "discord.js";
import { AcceptApplicationButtonConstants } from "../../constants/gameApplication";
import { GlobalConstants } from "../../constants/global";
import { Button } from "../_button";
import { ApplicationAction } from "../../functions/_Base/commonMethods";
import { applicationAction } from "../../functions/GameApplications/appAction";

function getButton(client?: Client, interaction?: Interaction, id?: string) {    
    return new ButtonBuilder()
        .setCustomId(AcceptApplicationButtonConstants.ID + GlobalConstants.ID_SEPARATOR + id)
        .setLabel(AcceptApplicationButtonConstants.TITLE)
        .setStyle(ButtonStyle.Success)
}

async function execute(client: Client, interaction: Interaction) {
    if (interaction.isButton()){
        log(interaction)
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
